const mongoose = require("mongoose");
const Validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


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
},{ timestamps : true});

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({_id : user._id}, "DEVTINDER$6767",{expiresIn: "1d"});
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
   const user = this;
   const passwordHash = user.password;

   const isPasswordValid = await bcrypt.compare(passwordInputByUser,
    passwordHash
   );

   return isPasswordValid;

}

//module.exports = mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema);
module.exports = User;