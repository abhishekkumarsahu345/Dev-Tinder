const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const ConnectionRequest=require("../model/connectionRequest");
const USER_SAFE_DATA ="firstName lastName photoUrl age gender" ;
const User=require("../model/user");
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

userRouter.get("/feed",userAuth,async(req,res)=>{
try{
    const loggedInUser=req.user;
    
    const page= parseInt(req.query.page)|| 1;
    let limit=parseInt(req.query.limit)||10;
    limit =limit>50? 50:limit;
    const skip=(page-1)*limit;
    // see logic that in feed you will not see your card,already accepted or rejected or connected cards ok
    const connectionRequests=await ConnectionRequest.find({
        $or: [ {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}],
    }).select("fromUserId toUserId");
    const hideUsersFromFeed=new Set();
    connectionRequests.forEach((req)=>{

     hideUsersFromFeed.add(req.fromUserId.toString());
     hideUsersFromFeed.add(req.toUserId.toString());


    });
    const users=await User.find({
        $and: [
            {_id:{$nin:Array.from(hideUsersFromFeed)}},
            {_id:{$ne:loggedInUser._id}},
        ],

    }).select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({data:users});
}catch(err){
    res.status(404).json({message:err.message});
}
});
module.exports=userRouter;