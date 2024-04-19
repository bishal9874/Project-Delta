const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/QuizAppUsers",{
}).then(()=>{
   console.log(`connection Success`);
}).catch((e)=>{
   console.log(e);
})
const userSchema = new mongoose.Schema({
   name:{
      type:String,
      required:true,
   },
   email:{
      type:String,
      required:true,
      unique:true
   },
   dob: {
      type: String,
      required: true,
   },
   gender: {
      type: String,
      required: true,
   },
   password:{
      type:String,
      required:true,
   },
})
const UserCollection = new mongoose.model("UserCollection",userSchema);

module.exports = UserCollection;