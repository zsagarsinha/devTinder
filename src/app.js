const express = require('express');

const app = express();



app.use("/code",(req, res) => {
    res.send("Baby ko bass pasand hai ");
});
app.use("/",(req, res) => {
    res.send("Namaste from the server");
});
app.use("/kemcho",(req, res) => {
    res.send("Kem cho bhaii, maja ma?");
});



app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});