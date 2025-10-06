// SDK initialization
var ImageKit = require("imagekit");
const { v4: uuidv4 } = require('uuid');

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URLENDPOINTS
});

async function imageUpload(fileData) {
    return new Promise((resolve, reject) => (
        imagekit.upload({
            file: fileData,
            fileName: `${uuidv4()}`,
            folder: 'caption'
        }, (error, result) => {
            if (error) {
                console.log('error while uploading file', error)
                reject(error)
            } else {
                resolve(result)
            }
        })
    ))
}

module.exports = imageUpload