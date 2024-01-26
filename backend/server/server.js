const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');

const server = http.createServer(app);

// Configuration CORS pour Socket.IO
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // Remplacez par l'URL de votre client Next.js
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('client message', (msg) => {
    console.log('message: ' + msg);
    // Utilisation de socket.broadcast.emit pour envoyer le message à tous les clients sauf à l'émetteur
    socket.broadcast.emit('client message', msg);
  });


  socket.on('bot message', (msg) => {
    console.log('message: ' + msg);
    // Utilisation de socket.broadcast.emit pour envoyer le message à tous les clients sauf à l'émetteur
    socket.broadcast.emit('bot message', msg);
  });
});

const PORT = process.env.PORT || 2000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
