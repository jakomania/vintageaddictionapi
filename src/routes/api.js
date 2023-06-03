const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Room = require("../../models/Room");
const status = require("http-status");

//Schema User
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: El nombre de usuario
 *              email:
 *                  type: string
 *                  description: El correo electrónico del usuario
 *              password:
 *                  type: string
 *                  description: La contraseña del usuario
 *              avatar:
 *                  type: string
 *                  description: La URL de la imagen del avatar del usuario
 *              room:
 *                  type: string
 *                  description: El ID de la sala del usuario
 *          required:
 *              - username
 *              - email
 *              - password
 *              - avatar
 *              - room
 *          example:
 *              username: admin
 *              email: admin@gmail.com
 *              password: "1234"
 *              avatar: images/punk05.png
 *              room: 1
 */

//Schema Room
/**
 * @swagger
 * components:
 *  schemas:
 *      Room:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The room id
 *          required:
 *              - id
 *          example:
 *              id: room01
 */

//Registrar usuario
/**
 * @swagger
 * /register:
 *  post:
 *      summary: register user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          room:
 *                              type: string
 *                          avatar:
 *                              type: string
 *                      required:
 *                          - username
 *                          - email
 *                          - password
 *                          - room
 *                          - avatar
 *                  example:
 *                      username: paloma
 *                      email: paloma@gmail.com
 *                      password: "1234"
 *                      room: "1"
 *                      avatar: images/punk02.png
 */
router.post("/register", async (req, res, next) => {
  const userData = req.body;    

  try {
    const userFromDb = await User.findOne({ email: userData.email });
    if (userFromDb) {
      console.log("El usuario ya existe");
    }
    const user = new User(userData);
    const saveUser = await user.save();
    if (saveUser) {
      res.status(200).send(saveUser);
    }
  } catch (error) {
    next(error);
  }
});

//Login Usuario
/**
 * @swagger
 * /login:
 *  post:
 *      summary: login user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      required:
 *                          - email
 *                          - password
 *                  example:
 *                      email: admin@gmail.com
 *                      password: "1234"
 *      responses:
 *          200:
 *              description: User logged!
 */
router.post('/login', async (req, res, next) => {
    res.json(req.body);
    const userData = req.body;
    const userFromDb = await User.findOne({ email: { $regex: new RegExp(userData.username, 'i') } });

    if (userFromDb) {res.status(200).send(userFromDb);}

});

//Listar usuario por username
/**
 * @swagger
 * /api/users/{username}:
 *  get:
 *      summary: Get User by Username
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *            required: true
 *            description: Username
 *      responses:
 *          200:
 *              description: User found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *                      example:
 *                          username: admin
 *          404:
 *              description: User not found
 */
router.get('/users/:username', (req, res) => {
    const username = req.params.username;

    User.findOne({ username })
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'Error en el servidor' });
        });
});

//Listar usuarios
/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Users list
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Users List
 *              content:
 *                  application/json:
 *                      schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          room:
 *                              type: string
 *                          avatar:
 *                              type: string
 *                      required:
 *                          - username
 *                          - email
 *                          - password
 *                          - room
 *                          - avatar
 *                  example:
 *                      username: admin
 *                      email: pau@gmail.com
 *                      password: "1234"
 *                      room: "1"
 *                      avatar: images/punk02.png
 * components:
 *   schemas:
 *      User:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: username
 *              email:
 *                  type: string
 *                  description: email
 *              password:
 *                  type: string
 *                  description: password
 *              avatar:
 *                  type: string
 *                  description: image url
 *              room:
 *                  type: string
 *                  description: favourite room
 */
router.get('/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error' });
        });
});

//Borrar usuario por Username
/**
 * @swagger
 * /api/users/{username}:
 *  delete:
 *      summary: Delete user by Username
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *            required: true
 *            description: Username
 *      responses:
 *          200:
 *              description: User deleted!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example:
 *                              username: paloma
 *          404:
 *              description: User noy found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example:
 *                              username: paloma
 */
router.delete('/users/:username', async (req, res, next) => {
    const { username } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({ username });

        if (deletedUser) {
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        next(error);
    }
});

//Modificar room de usuario por Username
/**
 * @swagger
 * /api/users/{username}:
 *  put:
 *      summary: Update room by Username
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *            required: true
 *            description: Username
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          room:
 *                              type: string
 *                          avatar:
 *                              type: string
 *                      required:
 *                          - email
 *                          - password
 *                          - room
 *                          - avatar
 *                  example:
 *                      email: paloma@gmail.com
 *                      password: "1234"
 *                      room: "1"
 *                      avatar: images/punk02.png
 *      responses:
 *          200:
 *              description: User deleted!

 *          404:
 *              description: User noy found
 */
router.put('/users/:username', async (req, res, next) => {
    const { username } = req.params;
    const { email, password, room, avatar } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { username },
            { $set: { email, password, room, avatar } },
            { new: true }
        );

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});

//Información de room por id
/**
 * @swagger
 * /api/rooms/{id}:
 *  get:
 *      summary: Get Room by ID
 *      tags: [Room]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The room ID
 *      responses:
 *          200:
 *              description: Room ID
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Room'
 *          404:
 *              description: Room not found
 * components:
 *   schemas:
 *      Room:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The room ID
 */
router.get('/rooms/:id', (req, res) => {
  const room_id = req.params.id;  
  
  Room.findOne({id: room_id})
    .then(documento => {
      res.status(200).json(documento);      
      })
    .catch(error => {
      res.status(500).json({ mensaje: 'Error en el servidor', error });
    });
});

//Elimina usuarios de la sala
/**
 * @swagger
 * /api/leave/:
 *  put:
 *      summary: Update room by Username
 *      tags: [Room]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                      required:
 *                          - username
 *                  example:
 *                      username: admin
 *      responses:
 *          200:
 *              description: Leave Room!
 *          404:
 *              description: Room not found
 */
router.put('/leave/', (req, res) => {
    Room.find().exec()
        .then(docs => {
            docs.forEach(room => {
                const index = room.users.findIndex(user => user.username === req.body.username );

                if (index >= 0) {
                    room.users.splice(index,1);
                    Room.updateOne({id: room.id}, { users: room.users })
                        .then((resultados) => {
                            console.log(resultados);
                            res.status(200).json(resultados);
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).json({ error: error});
                        });
                }})})
        .catch(error => {
            console.log(error);
        })});

//Agrega usuarios a la sala
/**
 * @swagger
 * /api/join/{id}:
 *  put:
 *      summary: Update room by Username
 *      tags: [Room]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Room id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                      required:
 *                          - username
 *                  example:
 *                      username: admin
 *      responses:
 *          200:
 *              description: Join Room!
 *          404:
 *              description: Room not found
 */
router.put('/join/:id', (req, res) => {
    console.log('JOINING:', req.body.username);

    Room.findOne({id: req.params.id})
        .then(doc => {
            if (doc.users.length >= 0 && doc.users.length < 2 ) {
                var new_user = {
                    username: req.body.username,
                    avatar: req.body.avatar
                };
                doc.users.push(new_user);
                Room.updateOne({id: req.params.id}, { users: doc.users })
                    .then(() => {
                        res.status(200).json({result: 'Ok!'});
                    })
                    .catch(() => {
                        res.status(500).json({error: error});
                    });
            }})
        .catch((error) => {
            res.status(500).json({error: error});
        });
});

module.exports = router;