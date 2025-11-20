import mongoose from 'mongoose';

async function connectToDb() {
    try {
        let response = await mongoose.connect(`${process.env.MONGODB_URI}/taskflow`)
        if (response) {
            console.log('Mongo successfully connected');
        };
    } catch (error) {
        console.warn('Connection error :: mongodb :: ', error)
        throw new Error("Connection error :: mongodb");
    };
}


export default connectToDb;