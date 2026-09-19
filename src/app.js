const express = require('express');
const app = express();
const connectDB = require("./config/database");
const  User = require("./models/user"); 

app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/signup",async (req,res) => {
  const user = new User(req.body); // Create a new user instance with the request body data
  try{
    await user.save();
  res.send("User is Successfully Signed Up");}
catch(err) {
  res.status(400).send("Error in signing up the user");

}});

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
