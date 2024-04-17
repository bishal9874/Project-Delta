
const express = require("express")
const hbs = require("hbs")
const app = express()
const port = process.env.PORT || 3000
require("./db/mongo")
const path = require("path")

const static_path = path.join(__dirname,"../public");
const viewPath = path.join(__dirname,"views")
app.use(express.static(static_path))

app.set('view engine','hbs')
app.set('views',viewPath)


app.listen(port,()=>{
    console.log(`port running on ${port}`);
})

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/admin",(req,res)=>{
    res.render("adminlogin")
})