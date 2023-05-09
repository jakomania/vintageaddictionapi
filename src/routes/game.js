var express = require('express');
const users = require("../users/user.db");
var router = express.Router();
const rooms = require('../Room');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    console.log(req.session.user);
    res.render('room', {
        roomId: req.params.id,
        user: req.session.user,
        other: rooms.find(room => room.id === req.params.id).users.find(user => user.email !== req.session.user.email)
    });
});

module.exports = router;