const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({  
  name: String,
  players: [
    {
    name: String,
    avatar: String
    },
  ]
  
});

//UserSchema.set("timestamps", true);

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
