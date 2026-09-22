const mongoose = require("mongoose");
const Validator = require("validator");

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
        trim : true,
        validate(value) {
            if(!Validator.isEmail(value)) {
                throw new Error("Email is invalid "+value);
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
         validate(value) {
            console.log("Validating password: "+value);
            if(!Validator.isStrongPassword(value)) {
                throw new Error("Password is not strong enough "+value);
            }
        }
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
       }
  },
    about : {
        type : String,
        default : "Hey there! I am using DevTinder"
    },
    photoUrl : {
        type : String,
         validate(value) {
            if(!Validator.isURL(value)) {
                throw new Error("Photo URL is invalid "+value);
            }
        }
    },
    skills : {
        type : [String]
    }
},{ timestamps : true})

//module.exports = mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema);
module.exports = User;