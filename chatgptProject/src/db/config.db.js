import mongoose from 'mongoose'

async function connectToDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/gpt`)
            .then(() => console.log('MongoDb connected successfully'))
    } catch (error) {
        console.log('Error while connecting to mongodb ::', error)
    }
}

export default connectToDB;