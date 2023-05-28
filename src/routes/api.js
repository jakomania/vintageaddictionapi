const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Room = require("../../models/Room");
//const status = require("http-status");


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


// router.post("/rooms", async (req, res, next) => {
//   const userData = req.body;    

//   try {
//     const room = new Room(userData);
//     const saveRoom = await room.save();

//     if (saveRoom) {
//       res.status(200).send(saveRoom);
//     }
//   } catch (error) {
//     next(error);
//   }
    
// });




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





router.put('/rooms/:id', (req, res) => {
  const room_id = req.params.id;
  const nuevosDatos = req.body;

  console.log(nuevosDatos);
  
  Room.findOneAndUpdate({id: room_id}, nuevosDatos, { new: true })
    .then(documentoActualizado => {
      if (documentoActualizado) {
        res.json(documentoActualizado);
      } else {
        res.status(404).json({ mensaje: 'Documento no encontrado' });
      }
    })
    .catch(error => {
      res.status(500).json({ mensaje: 'Error en el servidor', error });
    });
});



// router.post('/login', async (req, res, next) => {
//   //res.json(req.body);  
//   const userData = req.body;
//   const userFromDb = await User.findOne({ email: userData.username });

//   if (userFromDb) {res.status(200).send(userFromDb);}  
  
// });





module.exports = router;