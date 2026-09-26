const express = require("express");
const authRouter = express.Router();
const {ValidateSignUpData} = require("../utils/validation");
const  User = require("../models/user"); 
const bcrypt = require("bcrypt"); // Import the bcrypt library for password hashing

//signing up a new user
authRouter.post("/signup",async (req,res) => {
try{
//validation of data
  ValidateSignUpData(req);
const { firstName, lastName, email, password } = req.body; // Destructure the request body to get the user data *required for sign up

  //Encrypting the password
  const passwordHash = await bcrypt.hash(password, 10); // Hash the password using bcrypt with a salt round of 10
   const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash }); // Create a new user instance with the request body data
  
    await user.save();
  res.send("User is Successfully Signed Up");}
catch(err) {
  res.status(400).send("Something went wrong "+err.message);

}});

authRouter.post("/login", async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne ({email: email});
    if(!user) {
      return res.status(404).send("User does not exist");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create a JWT Token

      const token = await user.getJWT();

      //Add the token to the cookie and send the response back to the user

      res.cookie("token",token, {
        expires : new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successfull!!")
    }
    else{
      throw new Error("Invalid credentials")
    }
}
catch (err) {
  res.status(400).send("Error : " +err.message)

}});

authRouter.post("/logout", async (req,res) => {
  res.cookie("token", null , {
    expires : new Date(Date.now()),
  });
  res.send("Logout Successfull");
});

module.exports = authRouter;