const mongoose=require('mongoose');
 const connectDb= async()=>{
     await mongoose.connect(
       "mongodb+srv://abhishekkumarsahu345:abhishek123@devtinder.ceqmuqe.mongodb.net/DevTinder"
    );
   
 };
 module.exports=connectDb;