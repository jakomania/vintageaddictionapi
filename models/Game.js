const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    winner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    score: {
        type: Number,
        default: 0
    }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;