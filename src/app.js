const express=require('express');
const app=express();
const connectDb=require("./config/database");
const User=require("./model/user");
const { validateSignUpData}=require("./utils/validator")
const bcrypt= require('bcrypt');
const cookieparser=require("cookie-parser");

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



    // add token to cookie and send the token 



    res.cookie("token","loremn@3434and this is the cookie tha you don't know but present ok dear don't worry ");

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

res.cookie("token","abc123");
 const cookies = req.cookies;
console.log(cookies);
res.send("reading cookies");
});

connectDb()
  .then(()=>{
    console.log("database is coonnected");
    app.listen(8000,()=>{
        console.log("server is started");
    });
  })
  .catch((err)=>{
    console.log("Database can't be connected");
  });




