const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/mongo");
const path = require("path");
const UserCollection = require("./db/mongo");
const session=require("express-session")


app.use(session({
    secret:"apple12345",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
}))


// Set up paths and view engine
const static_path = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "views");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", viewPath);

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// Routes
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/admin", (req, res) => {
    res.render("adminlogin");
});


app.post("/userCreation", async (req, res) => {
    const { name, email, password, dob, gender } = req.body;
    let userData;
    try {
        // Check if user already exists
        const userExisting = await UserCollection.findOne({ email: email });
        if (userExisting) {
            return res.redirect('/register?message=userExists');
        } else {
            // Create new user
            userData = await UserCollection.create({
                name,
                email,
                password,
                dob,
                gender
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
    // Render home page with user data
    res.status(201).render("home", { userData });
});


app.post('/SignInData', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserCollection.findOne({ email: email });
        if (user) {

            if (user.password === password) {

                res.status(200).render("home", { userData: user });
            } else {
                res.status(401).redirect('/login?message=incorrectPass');
            }
        } else {

            res.status(404).redirect('/login?message=userNotFound');
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
function sessionval(req,res,next){
    if (req.session.userId){
        next();
    }
    else{
        res.send("UNAUTHORISED ACCESS !");
    }
}
app.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.log(err)
        }
        else{
            res.render("login")
        }
    })
})



