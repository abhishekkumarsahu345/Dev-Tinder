const express=require("express");
const User=require("../model/user");
const bcrypt=require("bcrypt");
const authRouter=express.Router();
const { validateSignUpData}=require("../utils/validator");



authRouter.post("/login", async (req,res)=>{
  try{
    const{email,password}=req.body;
    const user =await User.findOne({email:email});
    if(!user){
      throw new Error(" some invalid credential");
    }
    const isPasswordValid=await user.validatePassword(password);
    
    
    if(isPasswordValid){
      const token=await user.getJWT();
      res.cookie("token",token);
   
      res.send(user);
    }else {
      throw new Error("invalid credentials ");
    }

  }catch(err){
    res.status(404).send("error"+err.message);
  }
});


authRouter.post("/signup",async (req,res)=>{
  try{
    //validation of data
     validateSignUpData(req);
    const {firstName,lastName,email,password}=req.body;
    

    //encrypt the password
    const passwordHash= await bcrypt.hash(password,10);
    
    const user= new User({
      firstName,
      lastName,
      email,
      password:passwordHash,
    });

    
  await user.save();
  res.send("data saved to database 333");
  } catch(err){
    res.status(400).send("Error saving the user"); 
  }
});
authRouter.post("/logout", async (req,res)=>{
  res.cookie("token",null,{
    expires: new Date(Date.now()),
  });
  res.send("logged out successfully ok don't worry god is with you always");
});

// what should be the export
module.exports=authRouter;