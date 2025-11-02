import app from './src/app.js';
import { createServer } from "http";
const httpServer = createServer(app);
import dbConnection from './src/db/config.db.js'
import { socketServer } from './src/services/socket.services.js'

const PORT = process.env.PORT || 3000

dbConnection()
socketServer(httpServer)


httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})