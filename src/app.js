const express = require('express');
const app = express();
const connectDB = require("./config/database");
const  User = require("./models/user"); 

app.use(express.json()); // Middleware to parse JSON request bodies

//signing up a new user
app.post("/signup",async (req,res) => {
  const user = new User(req.body); // Create a new user instance with the request body data
  try{
    await user.save();
  res.send("User is Successfully Signed Up");}
catch(err) {
  res.status(400).send("Something went wrong "+err.message);

}});

//fetching the data of a single user
app.get("/user", async (req,res)=>{

  const userPassword = req.body.password; // Get the password from the postman

  try{
    const user = await User.find({ password: userPassword }); // Find the user with same password as the given one from the postman
    
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
app.patch("/user", async (req,res) => {
  const userID = req.body.userID;
  const data = req.body;
  try{
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
