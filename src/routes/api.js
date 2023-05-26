const express = require("express");
const router = express.Router();

const User = require("../../models/User");
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



// router.post('/login', async (req, res, next) => {
//   //res.json(req.body);  
//   const userData = req.body;
//   const userFromDb = await User.findOne({ email: userData.username });

//   if (userFromDb) {res.status(200).send(userFromDb);}  
  
// });





module.exports = router;