const express = require('express'); 
const app = express(); 
const connectDB = require("./config/database"); 
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



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
