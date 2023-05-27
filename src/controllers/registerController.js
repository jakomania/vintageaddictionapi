var express = require('express');
const User = require("../../models/User");
var router = express.Router();

//const { Register } = require("../routes/Register.js");


router.get('/register', (req, res, next) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;    

    try {
      const userFromDb = await User.findOne({ email: userData.email });
      if (userFromDb) {
        console.log("El usuario ya existe");
      }
      const user = new User(userData);
      const saveUser = await user.save();
      if (saveUser) {
        res.status(200).redirect('/login');
      }
    } catch (error) {
      next(error);
    }
});

module.exports = router;