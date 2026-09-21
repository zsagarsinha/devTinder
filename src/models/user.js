const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    lastName : {
        type : String,
        minlength : 3,
        maxlength : 20
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    age : {
        type : Number,
        min : 18,
        max : 100
    },
    gender : {
        type : String,
        validate(value) {
            if(value !== "male" && value !== "female" && value !== "other") {
                throw new Error("Gender must be either male, female or other");
            }
    }},
    about : {
        type : String,
        default : "Hey there! I am using DevTinder"
    },
    photoUrl : {
        type : String,
    },
    skills : {
        type : [String]
    }
},{ timestamps : true})

//module.exports = mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema);
module.exports = User;