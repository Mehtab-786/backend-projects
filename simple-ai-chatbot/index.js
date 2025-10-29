const { createServer } = require("http");
const { Server } = require("socket.io");

const app = require('./src/app');

const generateContent = require('./src/services/ai.services')

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log('🟢 New user connected:', socket.id);

  socket.on('message', async (data) => {
    console.log(`Received message ::  ${data}`)

    const reply = await generateContent(data)
    console.log(reply)

    socket.emit('reply',  reply)
  })

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });

});

httpServer.listen(3000, () => {
  console.log('server connect')
});