import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
});

import app from './app.js'
import connectDb from './db/db.config.js'

const PORT = process.env.PORT || 8000;

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log('Mongo_db connection error :: ', err)
    });