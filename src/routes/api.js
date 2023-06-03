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
      res.status(200).json(saveUser);
      //res.status(200).send(saveUser);
    }
  } catch (error) {
    next(error);
  }
});


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



module.exports = router