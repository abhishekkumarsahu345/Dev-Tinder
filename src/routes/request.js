const express=require("express");
const {userAuth}=require("../middleware/auth");

const requestRouter=express.Router();
requestRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{

console.log("it is the connection request");
res.send("yes your are connected");
}); 

module.exports=requestRouter;