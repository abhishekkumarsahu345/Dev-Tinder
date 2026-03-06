const express=require('express');
const app=express();
const connectDb=require("./config/database");
const User=require("./model/user");
const { validateSignUpData}=require("./utils/validator")
const bcrypt= require('bcrypt');


app.use(express.json());
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




