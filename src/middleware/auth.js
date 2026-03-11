const jwt=require("jsonwebtoken");
const User=require("../model/user");
const userAuth= async (req,res,next)=>{
    try{

        //read token
        const {token}=req.cookies;
        if(!token){
            throw new Error("token not found");
        }
        //validatae token
        const decodeObh=await jwt.verify(token,"devTinder@2001");
        //finduser
        const{_id}=decodeObj;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("user not found");
        }
        req.user=user;  // the respectve user i got i just sending it with request
        next();
    } catch(err){
        res.status(404).send("Erroer",err.message);
        
    };

};
module.exports= {
    userAuth,
}