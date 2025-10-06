const mongoose = require('mongoose')

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log('DB connected successfully')
            })
            .catch((err) => {
                console.log('Error while connecting to DB ::', err)
            })
    } catch (error) {
        console.log('Error while connecting to DB ::', error)
    }
}

module.exports = connectToDb