const express=require('express');
const app=express();
const connectDb=require("./config/database");
const User=require("./model/user");
const cookieparser=require("cookie-parser");
const bcrypt= require('bcrypt');

const jwt=require("jsonwebtoken");
const { error } = require('node:console');
const {userAuth}=require("./middleware/auth");

app.use(express.json());
app.use(cookieparser());  






app.listen(7777,()=>{
  console.log("app is listening on port 7777 bro don't worry");
 
});
connectDb()
  .then(()=>{
    console.log("database is coonnected");
  })
  .catch((err)=>{
    console.log("Database can't be connected");
  });




