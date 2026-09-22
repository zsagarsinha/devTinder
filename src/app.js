const express = require('express'); 
const app = express(); 
const connectDB = require("./config/database"); 
const  User = require("./models/user"); 
const {ValidateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt"); // Import the bcrypt library for password hashing

app.use(express.json()); // Middleware to parse JSON request bodies

//signing up a new user
app.post("/signup",async (req,res) => {
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

app.post("/login", async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne ({email: email});
    if(!user) {
      return res.status(404).send("User does not exist");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Successfull!!")
    }
    else{
      throw new Error("Invalid credentials")
    }
}
catch (err) {
  res.status(400).send("Error : " +err.message)

}})

//fetching the data of a single user
app.get("/user", async (req,res)=>{

  const userPassword = req.body.password; // Get the password from the postman

  try{
    const user = await User.find( password, user.password); // Find the user with same password as the given one from the postman
    
    if(user.length===0){
      res.status(404).send("User does not exist");
    }

    else{
      res.send(user);
    }
  }
   catch(err){
    res.status(400).send("Something went wrong");
  }
});

//Fetching all the users from the database
app.get("/feed", async(req,res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.send(users)
}
  catch(err) {
    res.status(400).send("Something went wrong");
  }
});

//deleting an existing user
app.delete("/user", async (req,res) => {
   const userID = req.body.userID; // Get the user ID from the request body
  try {
    const deletedUser = await User.findByIdAndDelete(userID);
    res.send("User deleted successfully");
  }
  catch(err) {
    res.status(400).send("Something went wrong");
  }
})

//updating an existing user
app.patch("/user/:userID", async (req,res) => {
  const userID = req.params?.userID;
  const data = req.body;
  try{
    const ALLOWED_UPDATES = [ "password", "about", "photoUrl", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k)); // Takes all the keys in data and check whether EVERY key is present in the ALLOWED_UPDATES array or not. If yes, then isUpdateAllowed will be true, else false
    if(!isUpdateAllowed) {
      return res.status(400).send("Invalid updates ");
    } 
    if(data.skills && data.skills.length > 10) {
      throw new Error("Skills cannot be more than 10"); 
    }
    if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
}
    await User.findByIdAndUpdate(userID, data, { runValidators: true }); // Update the user with the given ID and data, and run validators
    
    res.send("User updated successfully");
  }
  catch(err) {
    res.status(400).send("Something went wrong "+err.message
    );
  }
})
connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
}); 

    })
    .catch((err) => {
        console.log("Error connecting to the database", err);
    }
)
