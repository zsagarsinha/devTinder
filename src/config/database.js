const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb://sagarsinhaa07_db_user:Sagar1527@ac-vvujtg7-shard-00-00.kwgqypp.mongodb.net:27017,ac-vvujtg7-shard-00-01.kwgqypp.mongodb.net:27017,ac-vvujtg7-shard-00-02.kwgqypp.mongodb.net:27017/DevTinder?ssl=true&replicaSet=atlas-5c6d12-shard-0&authSource=admin&appName=NamasteNodeJS")
    console.log("Connected DB : ", mongoose.connection.name)
};

module.exports = connectDB;