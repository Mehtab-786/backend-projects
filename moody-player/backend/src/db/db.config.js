const mongoose = require('mongoose')

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log('Database connected successfully')
            })
            .catch((err) => {
                console.log('Error on DB connection,', err)
            })
    } catch (error) {
        console.log('Error while connecting to DB', error)
    }
}

module.exports = connectToDB