const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./util/wrapasync.js");
const expressError = require("./util/expressError.js");
const {listingSchema, reviewschema} = require("./schema.js");
const Review = require("./models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStategy = require("passport-local");
const User = require("./models/user.js")


const Listing = require("./routes/listing.js");
const review = require("./routes/review.js");
const user = require("./routes/user.js");


const mongo_url = "mongodb://127.0.0.1:27017/travelia";

const sessionoptions ={
    secret : "supersecret" ,
    resave: false ,
    saveUninitialized: true,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000 ,
        maxAge : 7*24*60*60*1000 ,
        httpOnly : true,
    }
};
app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname, "public")));

main().then((res)=>{
    console.log("connected to db");
}).catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url)
};

app.get("/", (req,res)=>{
    res.send("Hi ! I am root path");
})

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    next();
})

// app.get("/demouser", async (req,res)=>{
//     let fakeuser = new User({
//         email : "student@gmail.com",
//         username : "stu"
//     })

//     let registeredUser =await User.register(fakeuser , "helloduniya")
//     res.send(registeredUser);
// })

app.use("/listings", Listing);
app.use("/listings/:id/reviews", review );
app.use("/", user);



app.get("/testlist" , wrapAsync(async (req, res)=> {
    let sample = new listing({
        title : "The majestic ville",
        description : "by the beach",
        
        price : 3000 ,
    //create route

    location : "calangute , goa",
        country : "India"
    })
    await sample.save();console.log("sample was saved");
    res.send("Successful test");
})
)





app.use((req,res,next) => {
    next(new expressError(404, "Page not found"));
})

app.use((err , req, res, next) => {
    let {statuscode = 500, message= "Something went wrong"} = err;
    res.status(statuscode).render("error.ejs", {err});
    //res.status(statuscode).send(message);
})

app.listen(8080, ()=> {
    console.log("server listening to port 8080");
})