var express = require('express');
const users = require("../users/user.db");
var router = express.Router();
//const rooms = require('../Room');
const Room = require("../../models/Room");

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    //console.log(req.session.user);    
    Room.find()
        .exec()
        .then(rooms => {
                        
            res.render('room', {
                roomId: req.params.id,
                user: req.session.user,
                other: rooms.find(room => room.id === req.params.id).users.find(user => user.username !== req.session.user.username)
            });
            
        })
        .catch(error => {
            console.log('Se produjo un error:', error);
        }); 
    
});

module.exports = router;