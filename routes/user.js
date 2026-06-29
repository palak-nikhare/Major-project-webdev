const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../util/wrapasync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")

router.get("/signup" ,(req,res) => {
    res.render("users/signup.ejs");
})

router.post("/signup",saveRedirectUrl , wrapasync(async(req,res) => {
    try{
        let {username, email, password} = req.body;
    const newuser = new User({email, username});

    const registeredUser=await User.register(newuser, password)
    console.log(registeredUser);
    req.login(registeredUser , (err) => {
        if(err){
            return next(err);
        }
        let redirectUrl = res.locals.redirectUrl || "/listings";
        req.flash("success", "Welcome to Travelia");
    res.redirect(redirectUrl);
    })
    }
    catch(err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}))

router.get("/login", (req, res) => {
    res.render("users/login.ejs");

})

router.post("/login",saveRedirectUrl,passport.authenticate("local", {failureRedirect: "/login", failureFlash : true} ), async(req, res) => {
    req.flash("success","Welcome back to travelia");
    let redirectUrl = res.locals.redirectUrl || "/listings";

    res.redirect(redirectUrl);
})

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You are logged out");
        res.redirect("/listings");
    });
});

module.exports = router ;