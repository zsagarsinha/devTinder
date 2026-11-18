require("dns").setServers(["8.8.8.8", "8.8.4.4"])
const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://sagarsinhaa07_db_user:Sagar1527@namastenodejs.kwgqypp.mongodb.net/DevTinder")
    console.log("Connected DB : ", mongoose.connection.name)
};

module.exports = connectDB;