const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({  
  username: String,
  email: String,
  password: String,
  avatar: String,
  room: String,    
});

//UserSchema.set("timestamps", true);

const User = mongoose.model("User", UserSchema);

User.collection.drop()
  .then(() => {
    console.log('Generating default users');    
      })
  .catch(() => {
    console.error('Nothing to clear with with users');
  })
  .finally(() => {    
    var room = new User({ 
      username: 'admin',
      email: 'admin@gmail.com' ,
      password: '1234' ,
      avatar: 'images/punk05.png',
      room: '1',    
      });
    room.save();
    var room = new User({ 
      username: 'student',
      email: 'student@gmail.com' ,
      password: '1234',
      avatar: 'images/punk10.png',
      room: '2',    
      });
    room.save();    
  });



module.exports = User;
