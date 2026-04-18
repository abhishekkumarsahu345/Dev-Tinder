const express=require("express");
const app=express();
const connectDb=require("./config/database");

const cookieparser=require("cookie-parser");
const bcrypt= require('bcrypt');

const jwt=require("jsonwebtoken");

app.use(express.json());
app.use(cookieparser());  

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");  
const userRouter=require("./routes/user");
const cors=require("cors");

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}

));
app.use(authRouter);
app.use(profileRouter);
app.use(requestRouter); 
app.use(userRouter); 





connectDb()
  .then(()=>{
    console.log("database is coonnected");
    app.listen(7777,()=>{
  console.log("app is listening on port 7777 bro don't worry");
 
});
  })
  .catch((err)=>{
    console.log("Database can't be connected");
  });




