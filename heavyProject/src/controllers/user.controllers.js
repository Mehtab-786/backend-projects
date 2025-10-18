import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js';
import { cloudUpload } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

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
    let coverImageLocalPath ;
    
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

export { registerUser };
