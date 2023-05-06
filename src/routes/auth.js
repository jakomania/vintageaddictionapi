var express = require('express');
const users = require("../users/user.db");
var router = express.Router();

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
        res
            .cookie('email', encodeURIComponent(req.session.user.email), {
                secure: true
            })
            .redirect('/dashboard');
        return;
    }

    res.redirect('/login');
});

module.exports = router;