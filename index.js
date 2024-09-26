// const { Socket } = require('dgram');
// const express = require('express');
// const cors = require('cors');
// const http = require('http');
// const path = require('path');
// const { Server } = require('socket.io');
// const PORT = 5000;

// const app = express();
// const server = http.createServer(app);
// app.use(cors({ 
//     origin: 'http://localhost:3000', // Allow your React app
//     credentials: true,
// }));
// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:3000', // Your React app's URL
//         methods: ['GET', 'POST'],
//         credentials: true,
//     },
// });

// io.on('connection', socket => {
//     console.log(`A new user connected: ${socket.id}`)
//     socket.on('toServer', message => {
//         console.log(`Getting Message: ${message}`);
//         io.emit('toClient', message);
//     });
// })

// app.use(express.static(path.resolve('./public')));

// app.get('/', (req, res) => {
//     res.json({});
// })

// server.listen(PORT, () => console.log(`Server started at: ${PORT}`));