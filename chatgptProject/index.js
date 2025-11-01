import app from './src/app.js'
import dbConnection from './src/db/config.db.js'

const PORT = process.env.PORT || 3000

dbConnection()


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})