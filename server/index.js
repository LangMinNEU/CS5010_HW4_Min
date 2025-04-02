import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  const clientIP = socket.handshake.address;
  console.log(`----- User ${socket.id} connected -----`);

  socket.emit('your info', { 
    id: socket.id, 
    ip: clientIP 
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', `${socket.id}: ${msg} \n    - ${new Date().toLocaleString()}`);
    console.log(`>>> Message from ${socket.id}: ${msg} \n    - ${new Date().toLocaleString()}`);
  });

  socket.on('disconnect', () => {
    console.log(`----- User ${socket.id} disconnected -----`);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
