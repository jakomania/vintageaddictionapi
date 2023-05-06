var express = require('express');
var router = express.Router();

const { Register } = require("../routes/Register.js");


router.get('/register', (req, res, next) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    let register = new Register(req.body);
    let exists = register.checkEmail();



    if (!exists) {
        register.registerUser();
    }

    res.redirect('/login');
});

module.exports = router;