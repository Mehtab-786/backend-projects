import connectDb from './db/db.config.js'
import app from './app.js'

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