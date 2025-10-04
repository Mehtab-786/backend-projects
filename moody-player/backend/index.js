const app = require('./src/app')
const connectToDB = require('./src/db/db.config')

connectToDB()

app.listen(3000, () => {
    console.log('Server running on port , 3000')
})