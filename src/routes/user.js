const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const ConnectionRequest=require("../model/connectionRequest");
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



module.exports=userRouter;