var mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');
const DB_URI = 'mongodb+srv://admin:DXGxk8sN0DBxUPqh@cluster0.fdnw8ln.mongodb.net/';
const createConnection = () => {
    var MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://admin:DXGxk8sN0DBxUPqh@cluster0.fdnw8ln.mongodb.net/'
    mongoose.connect(MONGO_URL)
    mongoose.connection.on('connected', function () {
        console.log('Conneted to database')
    })

    mongoose.connection.on('error',function (err) {
        console.log('Error connecting to database: ' + err)
    })

    mongoose.connection.on('disconnected', function () {
        console.log('Disconneted from database')
    })

    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Disconnected from database at APP termination')
            process.exit(0)
        })
    })
}
const createCollection = () => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").createCollection("salas", function (err, res) {
                    if (err) {
                        if (err.ok == 0 && err.code == 48) {
                            console.log("Collection already exists");
                        }
                        else {
                            console.log("Error creating collection");
                        }
                    }
                    else {
                        console.log("Collection created!");
                        db.close();
                    }
                });
            }
        }
    )
}
const createCollectionJugadores = () => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").createCollection("jugadores", function (err, res) {
                    if (err) {
                        if (err.ok == 0 && err.code == 48) {
                            console.log("Collection already exists");
                        }
                        else {
                            console.log("Error creating collection");
                        }
                    }
                    else {
                        console.log("Collection created!");
                        db.close();
                    }
                });
            }
        }
    )
}
const createCollectionGame = () => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").createCollection("games", function (err, res) {
                    if (err) {
                        if (err.ok == 0 && err.code == 48) {
                            console.log("Collection already exists");
                        }
                        else {
                            console.log("Error creating collection");
                        }
                    }
                    else {
                        console.log("Collection created!");
                        db.close();
                    }
                });
            }
        }
    )
}
const insertGame = (game) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").collection("games").insertOne(game, function (err, res) {
                    if (err) {
                        console.log(err);
                        if (err.index == 0 && err.code == 11000) {
                            console.log("Game already exists in Database");
                        }
                        else {
                            console.log("Error inserting Game");
                        }
                    }
                    else {
                        console.log("Game inserted!");
                        db.close();
                    }
                });
            }
        }
    )
}
const getSalas = (rooms) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").collection("salas").find({}).toArray(function (err, res) {
                    if (err) throw err;
                    res.forEach((i) => {
                        rooms.push(i);
                    })
                    db.close();

                });
            }
        }
    )
}

exports.createConnection = createConnection;
exports.createCollection = createCollection;
exports.createCollectionGame = createCollectionGame;
exports.insertGame = insertGame;
exports.createCollectionJugadores = createCollectionJugadores;
exports.getSalas = getSalas;