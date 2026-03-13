const mongoose=  require("mongoose");
 const connectionRequestSchema= new mongoose.Schema(
 {
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId, // as the _id in mongose is a object id not a string so 
        required:true,
    },
    toUserId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true, 
        enum:{
            values:["ignored","interested", "accepted","rejected"],
            message:`{VALUE} is incorrecte status type`,
        },
    },
 }, {timestamps:true}
 );
  
 // after schema create a model
 const ConnectionRequestModel= new mongoose.model("ConnectionRequest",connectionRequestSchema);
  
// now export the modell
module.exports=ConnectionRequestModel; 