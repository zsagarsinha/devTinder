const express = require('express');

const app = express();


// app.get("/user/:userId/:name/:password",(req, res) => {
//     console.log(req.params);
//     res.send({firstName: "Sagar", lastname: "Sinha"})
// });



app.use("/user", (req,res,next) => {
  console.log("Handling route user 1");
  next();},

(req,res,next) => {
  console.log("Handling route user 2");
  next();
}

,(req,res,next) => {
  console.log("Handling route user 3");
  res.send({firstName: "Sagar", lastname: "Sinha"})
});


app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
}); 
