import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
});

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function cloudUpload(localFilePath) {
    try {
        if (!localFilePath) return null;

        //upload file on cloudinary
        const resp = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        
        //file upload success
        fs.unlinkSync(localFilePath); //remove file locally if sucesss
        
        return resp;
    } catch (error) {
        console.log('Error :: uploading file :: cloudinary :: ', error.message)
        fs.unlinkSync(localFilePath); //remove file locally if error
        return null;
    }
};

export { cloudUpload }