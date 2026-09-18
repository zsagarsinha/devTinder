const express = require('express');

const app = express();

const {adminAuth,userAuth} = require("../middlewares/auth");

app.use("/admin",adminAuth)

app.get("/admin/getAllData", (req,res,) =>{
  res.send("All data is fetched successfully")

});

app.get("/admin/deleteUser",(req,res) => {
  res.send("User is deleted successfully")
})

app.get("/user/data",userAuth, (req,res,next) => {
  res.send("User data is fetched successfully")
});

app.get("/user/login",(req,res) => {
  res.send("User is logged in successfully")
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
}); 
