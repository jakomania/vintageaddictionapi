var express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require("path");
const http = require('http');
const { Server } = require("socket.io");
//const rooms = require('./Room');
const Room = require("../models/Room");

var app = express();
const server = http.createServer(app);
const io = new Server(server);


const sessionMiddleware = session({
    store: new FileStore({
        path: './sessions',
        secret: 'my-secret-key'
    }),
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
});


// view engine setup
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.use('/', require('./routes/auth'));
app.use('/', require('./controllers/registerController'));
app.use('/', require('./routes/dashboard'));
app.use('/rooms', require('./routes/game'));
app.use('/api', require('./routes/api'));


app.get("/", (req, res) => res.redirect("/login"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).send();
});

let state = {}
var rooms = require('./Room');

io.on('connection', (socket) => {
    socket.emit('ocultaWinner');
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    socket.on('rooms:play', ({roomId}) => {
        const user = socket.request.session.user;
        if (!state[roomId]) {
            state[roomId] = []
        }

        state[roomId].push({
            username: user.username,
            color: Object.keys(state[roomId]).length === 0 ? 'red' : 'blue',
            owner: [],
            winner: false
        });

        console.log(user.username, 'joining roomId', roomId);
        socket.join(roomId);
    });

    socket.on('rooms:join', (message) => {
        console.log('JOINING:', message, socket.request.session.user);  
            
        Room.findOne({id: message})
            .then(doc => {
            console.log('Socket user data : ', socket.request.session.user.email);
            console.log('Users in room: ', doc.users);
            if (doc.users.length >= 0 && doc.users.length < 2 )
            {           
                var new_user = {
                    username: socket.request.session.user.username, 
                    avatar: socket.request.session.user.avatar
                };
                
                doc.users.push(new_user);
                Room.updateOne({id: message}, { users: doc.users })
                    .then(documentoActualizado => {
                        if (documentoActualizado) {
                            Room.find().exec()
                                .then(resultados => {                                    
                                    rooms = resultados
                                    //console.log(rooms);
                                })
                                .catch(error => {
                                    console.log('Se produjo un error:', error);
                                });                            
                        } else {
                            console.log('Docummento no encontrado');
                        }
                    })
                    .catch(error => {
                        console.log('Se produjo un error: ', error);
                    });
            }
            })
            .catch(error => {
                console.log(error);
            });


        // rooms
        //     .forEach(room => {
        //         const index = room.users.findIndex(user => user.email === socket.request.session.user.email);
        //         if (index >= 0) {
        //             room.users.splice(index,1);
        //         }
        //     });

        // const index = rooms.findIndex(item => item.id === message);
        // if (index >= 0) {
        //     rooms[index].users.push(socket.request.session.user);
        // }

        io.emit("rooms:joined", {
            roomId: message,
            username: socket.request.session.user.username
        });
    });

    socket.on('rooms:leave', (message) => {
        console.log(message, socket.request.session.user);

        rooms
            .forEach(room => {
                const index = room.users.findIndex(user => user.email === socket.request.session.user.email);
                if (index >= 0) {
                    room.users.splice(index,1);
                }
            });
    });

    socket.on('room:click', ({roomId, x, y}) => {
        console.log(roomId, x, y)
        const user = socket.request.session.user;        
        let enemyState = state[roomId].find((state) => state.username !== user.username);
        let myState = state[roomId].find((state) => state.username === user.username);

        if (enemyState && enemyState.winner === false && myState.winner === false) {
            if (enemyState.owner.findIndex((coords) => coords.x === x && coords.y === y) === -1) {
                if (myState.owner.length === 0) {
                    myState.owner.push({x,y});
                } else {
                    if (myState.owner.filter(coords => {
                        console.log('1',coords.x === x, coords.y - 1 === y, coords.y + 1 === y)
                        if ((coords.x === x) && (coords.y - 1 === y || coords.y + 1 === y)) {
                            return true;
                        }

                        if ((coords.x === x + 1 ||coords.x === x - 1) && (coords.y - 1 === y ||coords.y + 1 === y || coords.y === y)) {
                            return true;
                        }
                    }).length >= 1) {
                        myState.owner.push({x,y});
                    }
                }
            }

            if (myState.owner.length >= (16 / 2) + 1) {
                myState.winner = true;
            }
        }
        console.log('EL SEGUNDO USUARIO NO HA ENTRADO A LA SALA AUN');
        io.to(roomId).emit('room:state', state[roomId])
    });

});

setInterval(() => {
    io.emit('rooms:status', rooms);
}, 250);

module.exports = {server, io};