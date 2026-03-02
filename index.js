const express=require('express');
const app=express();

app.get("/",(req,res)=>{
   res.send("hey its woking");
});
app.get("/getdata",(req,res)=>{
    res.send({ user:"Abhishek",pass:"hashedit"});
});
app.post("/getdata",(req,res)=>{
    res.send({ user:"Abhishek",pass:"hashedit"});
    console.log("data is posted to the server");
});
app.delete("/getdata",(req,res)=>{
    res.send({ user:"Abhishek",pass:"hashedit"});
    console.log("data is posted to the server");
});

app.listen(8000,()=>{
    console.log("server start");
});