const express=require("express");
const profileRouter=express.Router();
const User =require("../model/user");
const {validateEditProfileData }=require("../utils/validator");
const {userAuth}=require("../middleware/auth");
 
profileRouter.get("/profile/view",userAuth, async(req,res)=>{
try {
  const user=req.user;// the user i got from the middlewware
  res.send(user);
 


} catch(err){
  res.status(404).send("error"+err.message);
};
});

profileRouter.patch("/profile/edit", userAuth,async (req,res)=>{
  try {
  if(!validateEditProfileData(req)){
    throw new Error("Invalid Edit Request");
  }
   const loggedUser=req.user;

  Object.keys(req.body).forEach((key)=>{loggedUser[key]=req.body[key]});
  console.log(loggedUser);
  await loggedUser.save();  

  // the below is normal way os saving data
  // /* res.send(`${loggedUser.firstName}, your profile updated successfully` );

  // actully like this send the resoponse in industry strands
  res.json({
    message: `${loggedUser.firstName}, your profile upated successfully`,
    data: loggedUser,
  });

  }catch(err){
    res.status(404).send(err.message);
  }
});

 
profileRouter.get("/user", async (req,res)=>{
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
profileRouter.patch("/user", async (req, res) => {
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


module.exports=profileRouter;