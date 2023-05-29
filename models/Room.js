const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({  
  id: String,
  users: [
    {
    username: String,
    avatar: String
    },
  ]
  
});

//UserSchema.set("timestamps", true);

const Room = mongoose.model("Room", RoomSchema);

Room.collection.drop()
  .then(() => {
    console.log('Initial room data clear');    
      })
  .catch(() => {
    console.error('Nothing to clear with rooms');
  })
  .finally(() => {    
    var room = new Room({ id: "room01", users: [] });
    room.save();
    var room = new Room({ id: "room02", users: [] });
    room.save();
    var room = new Room({ id: "room03", users: [] });
    room.save();
    var room = new Room({ id: "room04", users: [] });
    room.save();    
  });




module.exports = Room;
