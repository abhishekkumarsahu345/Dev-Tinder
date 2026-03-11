const express=require('express');
const app=express();
const connectDb=require("./config/database");
const User=require("./model/user");
const { validateSignUpData}=require("./utils/validator")
const bcrypt= require('bcrypt');
const cookieparser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const { error } = require('node:console');

app.use(express.json());
app.use(cookieparser());  


app.get("/user", async (req,res)=>{
  const userEmail=req.body.email;
  try{
    const user= await User.find({email:userEmail});
    if(user.length===0){
      res.status(404).send("user not fould ");
    }
    else {
      res.send(user);
    }
  } catch(err){
    res.status(404).send("someting wend wrong ");
  }
});


app.post("/login", async (req,res)=>{
  try{
    const{email,password}=req.body;
    const user =await User.findOne({email:email});
    if(!user){
      throw new Error(" some invalid credential");
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    // create JWT token 
      const token=jwt.sign({_id:user._id},"devTinder@2001");
   
    // add token to cookie and send the token 
        res.cookie("token",token);

    if(isPasswordValid){
      res.send("Login successful");
    }else {
      throw new Error("invalid credentials ");
    }

  }catch(err){
    res.status(404).send("error"+err.message);
  }
});

// Update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES=[""]
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      data,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED the age part:"+ err.message);
  }
});
app.post("/signup",async (req,res)=>{
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

app.get("/profile", async(req,res)=>{
try {
  const cookies = req.cookies;
  const {token}=   cookies;
  if(!token){
    throw new error("invalid token");
  }
  const decodedmessage=await jwt.verify(token,"devTinder@2001");
  const {_id}=decodedmessage;
  const user=await User.findById(_id);
  if(!user){
    throw new error("user not found ");
  }
  res.send(user);
  

} catch(err){
  res.status(404).send("error"+err.message);
};
});

connectDb()
  .then(()=>{
    console.log("database is coonnected");
  })
  .catch((err)=>{
    console.log("Database can't be connected");
  });




