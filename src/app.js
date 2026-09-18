const express = require('express');

const app = express();


app.use("/",(err,req,res,next) => {
  if(err){
    res.status(500).send("Error occurred while fetching user data contact support team");
  }
})

app.get("/getUserData",(req,res) => {
  //try{
  // Db query to get user data

 throw new Error("Database connection failed");
  res.send("User data sent")
//   catch(err){
//     res.status(500).send("Error occurred while fetching user data");
//     console.log("Error occurred while fetching user data");
// }
});

app.use("/",(err,req,res,next) => {
  if(err){
    res.status(500).send("Error occurred while fetching user data contact support team");
  }
})

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
}); 
