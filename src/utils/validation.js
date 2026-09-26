const validator = require('validator');

const ValidateSignUpData  = (req) => {
    const { firstName, lastName , email, password} = req.body; 
    if(!firstName|| !lastName) {
        throw new Error("First name and last name are required");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Invalid email");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "email", "photoURL","gender","about","skills","age"]
   const isEditAllowed = Object.keys(req.body).every(field =>
         allowedEditFields.includes(field)
        );
        return isEditAllowed;
}
module.exports = {ValidateSignUpData,
    validateEditProfileData
};