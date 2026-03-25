const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const ConnectionRequest=require("../model/connectionRequest");
const USER_SAFE_DATA ="firstName lastName photoUrl age gender" ;
userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        
        const connectionRequest= await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId","firstName lastName photoUrl age gender"); // as in connectionRequest 
        // schema if from user i have used ( ref: User) it is a  ref or add a connection to user table to the requestconect table 
        
        
          //.populate("fromUserId", [ "firstName","lastName"]);  can write also
        res.json({
            message:"Data fetch Successfully",
            data:connectionRequest,
        });
        
    }catch(err){
        res.status(400).send("Error" +err.message);
    }
});

userRouter.get("/user/connections", userAuth,async(req,res)=>{
try {
    const loggedInUser=req.user;
    const connectionRequests= await ConnectionRequest.find({
        $or: [
            {toUserId: loggedInUser._id,status:"accepted"},
            {fromUserId: loggedInUser._id,status:"accepted"},
        ],
    })
    .populate("fromUserId",USER_SAFE_DATA)
    .populate("toUserId",USER_SAFE_DATA);
    console.log(connectionRequests);
    const data=connectionRequests.map((row)=>{
        if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;

    });
    res.json({data});
}catch(err){
    res.status(404).send("Error"+err.message);
}





});
module.exports=userRouter;