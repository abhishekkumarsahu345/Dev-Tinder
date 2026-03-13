const mongoose=require('mongoose');
const express=require("express");
const { timeStamp } = require('node:console');
const validator=require('validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
 
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
 password:{
    type:String,
   
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
        required:true,
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

userSchema.methods.getJWT= async function () { // don't use arrow (=> ) here due to this will not work   
    const user=this;  // refer to the current user who is  running it
    const token= await jwt.sign({_id:user._id},"devTinder@2001", {expiresIn:"7d",});
    return token;
};

userSchema.methods.validatePassword= async function (passwordInputByUser) {
    const user= this;
    const isPasswordValid= await bcrypt.compare ( passwordInputByUser, user.password);
    return isPasswordValid;
};
const userModel=mongoose.model("user",userSchema);
module.exports=userModel;