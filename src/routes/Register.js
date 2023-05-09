
const users = require("../users/user.db");


class Register {


    constructor(formFields) {
        this.username = formFields.username;
        this.email = formFields.email;
        this.password = formFields.password;
        this.room = formFields.room;
        this.avatar = formFields.avatar;
    }

    checkEmail()
    {
        return users.find((user) => user.email === this.email );// return user object if exists
    }

    registerUser()
    {
        users.push({
            username: this.username,
            email: this.email,
            password: this.password,
            room: this.room,
            avatar: this.avatar
        })

    }
}


module.exports = { Register }