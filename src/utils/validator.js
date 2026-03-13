const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be strong (8+ chars, number, symbol)");
  }
};

 const validateEditProfileData= (req)=>{
  const allowedEditFields= [ "firstName","lastName","photoUrl","gender", "age", "about", "skills"];
  
  const isEditAllowed= Object.keys(req.body).every((field)=>
  allowedEditFields.includes(field));// this will compare and return a boolean value
  
return isEditAllowed; // boolean value is returned
 };

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};