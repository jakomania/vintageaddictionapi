
// node .\src\server.js
// entrar en http://localhost:3000/login

var express = require('express');
const session = require('express-session');
const path = require("path");
const http = require('http');
const { Server } = require("socket.io");

var app = express();
const server = http.createServer(app);
const io = new Server(server);

const sessionMiddleware = session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
});

// view engine setup
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/dashboard'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).send();
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    socket.on('rooms:join', (message) => {
        console.log(message, socket.request.session.user);

        io.emit("rooms:joined", {
            roomId: message,
            username: socket.request.session.user.username
        });
    });

});

module.exports = server;