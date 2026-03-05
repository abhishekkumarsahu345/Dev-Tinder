const express=require('express');
const app=express();
const connectDb=require("./config/database");
const User=require("./model/user");


app.use(express.json());
app.post("/signup",async (req,res)=>{
  const user=new User(req.body);
  try{
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




