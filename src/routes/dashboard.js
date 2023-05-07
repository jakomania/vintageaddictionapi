var express = require('express');
const users = require("../users/user.db");
var router = express.Router();

/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
    console.log("hola",req.session.user)
    res.render('dashboard', {
        user: req.session.user
    });
});



module.exports = router;