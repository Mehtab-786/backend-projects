import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js';
import { cloudUpload } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false
        });

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(400, 'Something went wrong while generating access and refresh token')
    }
}


const registerUser = asyncHandler(async function (req, res) {

    const { username, email, fullname, password, } = req.body;

    if (!username?.trim() || !email?.trim() || !fullname?.trim() || !password?.trim()) {
        console.log('something missing');
        throw new ApiError(400, 'All Fields are required !!');
    }

    const IsUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (IsUser) {
        throw new ApiError(409, 'User already exists !')
    }

    const avatarLocalPath = req.files.avatar[0]?.path;
    let coverImageLocalPath;

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0]?.path;
    } else {
        coverImageLocalPath = '';
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar file is required !')
    }

    const avatar = await cloudUpload(avatarLocalPath);
    const coverImage = await cloudUpload(coverImageLocalPath) || "";


    if (!avatar) {
        throw new ApiError(400, 'Avatar file is required !')
    }

    let user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        password,
        email,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    );

    if (!createdUser) {
        throw new ApiError(500, 'Something went wrong in Server !')
    }

    res.status(201).json(
        new ApiResponse(200, createdUser, 'User registered successflly')
    )

});

const loginUser = asyncHandler(async function (req, res) {
    const { username, email, password } = req.body;

    if (!username || !email) {
        throw new ApiError(400, 'Username or email is required')
    }

    const user = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        throw new ApiError(404, 'User not found !')
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(401, 'Invalid user credentials  !')
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken"); //again find user becuase earlier user is missing certain parameters

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                'User logged In succesfully'
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(
            new ApiResponse(200, {}, 'User logged out!')
        )

})


export { registerUser, loginUser, logoutUser };