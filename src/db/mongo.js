const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/QuizApp",{
}).then(()=>{
   console.log(`connection Success`);
}).catch((e)=>{
   console.log(e);
})