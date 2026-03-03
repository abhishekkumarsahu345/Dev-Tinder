const express=require('express');
const app=express();
const connectDb=require("./config/database");
const User=require("./model/user");

app.post("/signup",async (req,res)=>{
  const user=new User({
    firstName:"snnsons",
    lastName: "sahu",
    age:23,
    gender:"male",
    email:"arsahu345@gmail.com"
  });
  await user.save();
  res.send("data saved to database 333");
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




