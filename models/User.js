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
module.exports = User;
