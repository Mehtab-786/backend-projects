import app from './src/app.js';
import connectToDb from './src/db/db.config.js'

let port = process.env.PORT || 3000;

connectToDb();

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});