import App from './src/app.js';
const port = process.env.PORT || 3000;
import DbConnection from './src/db/db.config.js';

async function startServer() {
    try {
        await DbConnection();
        App.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error("Error :: Connection error", err);
        process.exit(1); // Exit gracefully
    }
}

startServer();