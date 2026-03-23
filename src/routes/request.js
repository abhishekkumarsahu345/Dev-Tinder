const express=require("express");
const {userAuth}=require("../middleware/auth"); 
const ConnectionRequest= require("../model/connectionRequest");
const requestRouter=express.Router();
const User=require("../model/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
try{
const fromUserId= req.user._id;//  from req we get 
const toUserId=req.params.toUserId;// in params we get the id to whom we sent request
const status= req.params.status;
const  allowedStatus=["ignored","interested"]; // this show only allowed stauses
 
if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"invalid ststus type " + status});
}

// check the user is exist or not exist in your database or not 
const toUser= await User.findById(toUserId);
if(!toUser){
    return res.status(404).json({message:"user not found "});
}

// another check when already request send then no duplicate request can be sent form both user 
const existingConnectionRequest= await ConnectionRequest.findOne({
    $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId: fromUserId},
    ],
});
if(existingConnectionRequest){
    return res.status(400).send({message:"connection request Already Exist!!"});
}
const connectionRequest= new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
});
const data= await connectionRequest.save();
res.json({
    message:"connection Request Sent Successfully",
    data, 
}); 
}catch(err){
    res.status(400).json({
        message:"Error r " +err.message
    });
}

}); 




// for the person to accept or reject the request come from user
requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{ 
try{
    const loggedInUser=req.user;
     const{ status,requestId}=req.params;
    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
        return res.status(404).json({message: "status not allowed"});

    }

    const connectionRequest=await ConnectionRequest.findOne({
       fromUserId :requestId,
       toUserId:loggedInUser._id,
       status:"interested", 
    });
    if(!connectionRequest){
        return res.status(404).json({ message:"Connection request not found"});
    }
    connectionRequest.status=status;
    const data= await connectionRequest.save();
    res.json({message:"Connection request"+status,data});
}catch(err){
    res.status(400).send("some thing wrong in... this api ");
}


});

module.exports=requestRouter;