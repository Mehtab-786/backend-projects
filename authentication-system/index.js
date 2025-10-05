const app = require('./src/app')
const connectToDb = require('./src/db/db.config')

connectToDb()

app.listen(3000, () => {
    console.log('Server running on port 3000')
})