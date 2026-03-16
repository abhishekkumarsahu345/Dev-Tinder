const express=require("express");
const {userAuth}=require("../middleware/auth"); 
const ConnectionRequest= require("../model/connectionRequest");
const requestRouter=express.Router();
requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
try{
const fromUserId= req.user._id;//  from req we get 
const toUserId=req.params.toUserId;// in params we get the id to whom we sent request

const  allowedStatus=["ignored","interested"];
 
if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"invalid ststus type" + status});
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
    res.status(400).send("Error",+err.message);
}

}); 

module.exports=requestRouter;