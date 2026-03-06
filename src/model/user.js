const mongoose=require('mongoose');
const { timeStamp } = require('node:console');
const validator=require('validator');
 
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{ 
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    email:{
        type:String,
        require:true,
        unique: true,
        lowercase:true,
        trim:true,
    },
    photoUrl:{
        type: String
    },
    about:{
        type:String,
         default:"this is default about data",
    },
    skills:{
        type:[String],
    },
    photoUrl: {
        type:String,
        default:"https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4"
    }
    
},{ timestamps: true });
const userModel=mongoose.model("user",userSchema);
module.exports=userModel;