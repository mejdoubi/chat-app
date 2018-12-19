require('./config/config.js');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {
  generateMessage,
  generateLocationMessage
} = require('./utils/message');
const {
  isRealString
} = require('./utils/validation');
const {
  Users
} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('sendRoomList', () => {
  io.emit('roomList', users.getRooms());
});

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('roomList', users.getRooms());

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name)) {
      return callback('Name is required.');
    }

    if (users.getUserByName(params.name)) {
      return callback('Name is already used. Please use another one.');
    }

    if (!isRealString(params.room) && !isRealString(params.activeRoom)) {
      return callback('Room name is required.');
    } else if (isRealString(params.room)) {
      // i wanna join this room
      // keep going
    } else if (isRealString(params.activeRoom)) {
      params.room = params.activeRoom;
    }

    params.room = params.room.toLowerCase();
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.emit('roomList', users.getRooms());
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (msg, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(msg.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage',
        generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.emit('roomList', users.getRooms());
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
