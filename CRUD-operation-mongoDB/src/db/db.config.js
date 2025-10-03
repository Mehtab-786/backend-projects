const mongoose = require('mongoose')

async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/todo')
        .then(() => {
            console.log('connected to DB')
        })
    } catch (error) {
        console.log('Error while connecting to db', error)
        throw error
    }   
}

module.exports = connectToDB