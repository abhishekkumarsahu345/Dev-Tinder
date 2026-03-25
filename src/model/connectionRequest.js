const mongoose=  require("mongoose");
 const connectionRequestSchema= new mongoose.Schema(
 {
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId, // as the _id in mongose is a object id not a string so 
        ref: "user",// ref to the user collection
        required:true,
    },
    toUserId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",// give  a ref ok
        required:true,
    },
    status:{
        type:String,
        required:true, 
        enum:{
            values:["ignored","interested", "accepted","rejected"],
            message:`{VALUE} is inco  rrecte status type`,
        },
    },
 }, {timestamps:true}
 );
// check if from and to user id both are same a person can't sent connection to himself
connectionRequestSchema.pre("save", async function() {
    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("can't send connection request to yourself");
    }

});
 // after schema create a model model Start capiatl always
 const ConnectionRequestModel= new mongoose.model("ConnectionRequest",connectionRequestSchema);
  
// now export the modell
module.exports=ConnectionRequestModel; 