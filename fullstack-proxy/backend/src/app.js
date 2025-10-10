require('dotenv').config()
const express = require('express');

const app = express()


app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            content: 'joke 1'
        },
        {
            content: 'joke 2'
        },
        {
            content: 'joke 3'
        },
    ]

    res.status(200).json({
        jokes
    })
})

module.exports = app