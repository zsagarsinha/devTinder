const express = require('express');

const app = express();

const connectDB = require("./config/database");
const  User = require("./models/user");

app.post("/signup",async (req,res) => {
  const user = new User({
    firstName : "Karuna",
    lastName : "Sinha",
    emailID : "karuna@sinha.com",
    password : "karuna@123"
  });
  try{
    await user.save();
  res.send("User is Successfully Signed Up");}
catch(err) {
  res.status(400).send("Error in signing up the user");

}});

connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
}); 

    })
    .catch((err) => {
        console.log("Error connecting to the database", err);
    }
)
