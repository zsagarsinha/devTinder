const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoURL status gender age about"

//Get all the pending connection requests for the logged in User
userRouter.get("/user/requests/received", userAuth, async (req,res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest.find ({
            toUserId : loggedInUser._id,
            status : "interested",
 }).populate("fromUserId", USER_SAFE_DATA)

 res.json ({
    message : " Connection Requests fetched successfullly", connectionRequests
 })
    } catch(err) {
        res.status(400).send("ERROR: " +err.message)
    }
})


userRouter.get("/user/connections", userAuth, async (req,res) => { 
    try {
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest.find({
            $or : [
                {fromUserId: loggedInUser._id, status : "accepted"},
               {toUserId: loggedInUser._id, status : "accepted"},
           ]}).populate ("fromUserId", USER_SAFE_DATA)
              .populate("toUserId", USER_SAFE_DATA);


 const data = connectionRequests.map((row) =>{ 
    if(row.fromUserId._id.equals(loggedInUser._id)){ 
        return row.toUserId;
    }
    return row.fromUserId
         });
          res.json({data})


    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
  }
});


userRouter.get("/feed", userAuth, async(req,res) => {
    try {

        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit; // max limit is 50
        const skip = (page-1) * limit;

        //Find all connection requests (sent + received)
        const connectionRequests = await ConnectionRequest.find({
            $or : [{ fromUserId : loggedInUser._id } , { toUserId : loggedInUser._id }]
        }).select("fromUserId toUserId")

        const hideUsersFromFeed = new Set (); 
        connectionRequests.forEach((request) => {
            hideUsersFromFeed.add(request.fromUserId.toString());
            hideUsersFromFeed.add(request.toUserId.toString());
        });
        console.log(hideUsersFromFeed);

        const users = await User.find({
          $and : [
             {_id : { $nin : Array.from(hideUsersFromFeed)}},
            {_id : {$ne : loggedInUser._id}},
           ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        
        res.send(users);

    } catch (err) {
        res.status(400).send("ERROR : " +err.message);    }
})

module.exports = userRouter