const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

   fromUserId: {
    type : mongoose.Schema.Types.ObjectId,
    required : true
},
   toUserId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true
   },
   status : {
    type : String,
    enum : {
        values : ["ignored", "accepted", "rejected","interested"],
        message : `{VALUE} is incorrect status type`
    },
   required: true

   },

},
{
    timestamps: true,
}
);

// every time someone sends a connection request we make the query so we need compound indexing
connectionRequestSchema.index({ fromUserId : 1, toUserId : 1 }); //we need compound indexing because in order to make the query fast, both fields are required to be fetched

connectionRequestSchema.pre("save", function() { // this is like a middleware & it will be called everytime a connectionRequest is saved
    const connectionRequest = this;
    //Check if fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error ("Cannot send request to yourself");
    }
});

const ConnectionRequest = mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequest;



