const { usersDb } = require("../users/user.db");

class Player {

    constructor(playerData) {
        this.player = playerData.player;
        this.avatar = playerData.avatar;
        this.room = playerData.room;
    }

}


module.exports = { Player }