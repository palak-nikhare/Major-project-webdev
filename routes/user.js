const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../util/wrapasync.js");
const passport = require("passport");

router.get("/signup" ,(req,res) => {
    res.render("users/signup.ejs");
})

router.post("/signup" , wrapasync(async(req,res) => {
    try{
        let {username, email, password} = req.body;
    const newuser = new User({email, username});

    const registeredUser=await User.register(newuser, password)
    console.log(registeredUser);

    req.flash("success", "Welcome to Travelia");
    res.redirect("/listings");
    }
    catch(err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}))


router.get("/login", (req, res) => {
    res.render("users/login.ejs");

})

router.post("/login",passport.authenticate("local", {failureRedirect: "/login", failureFlash : true} ), async(req, res) => {
    req.flash("success","Welcome back to travelia");
    res.redirect("/listings");
})

module.exports = router ;