import mongoose from 'mongoose';

async function connectToDb() {
    try {
        const resp = await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)
        if (resp) {
            console.log('Db connected successfully');
        }
    } catch (error) {
        console.log('Connection Error :: mongodb :: ', error)
        throw new Error("Connection Error :: mongodb ::");
    }
};

export default connectToDb;