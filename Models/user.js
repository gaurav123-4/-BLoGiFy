const {Schema , model }= require("mongoose");

const {createHmac} = require("node :crypto");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true,
        unique: true
    },

    salt : {
        type: String,
        required: true
    }
});