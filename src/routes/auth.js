var express = require('express');
const users = require("../users/user.db");
var router = express.Router();

/* GET users listing. */
router.get('/register', function(req, res, next) {
    res.render('register')
});

router.post('/register', (req, res) => {
    users.push({
        username: req.body.username,
        email: req.body.email,
        password: req.body.pass,
        room: req.body.room,
        avatar: req.body.avatar,
    });
});

router.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/dashboard');
        return;
    }


    res.render('login');
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/login");
    });
});

router.post('/login', (req, res) => {

    var user = users.find(user => {
        return user.email === req.body.email && user.password === req.body.password
    });

    if (user) {
        req.session.user = user;
        res.redirect('/dashboard');
        return;
    }

    res.redirect('/login');
});

module.exports = router;