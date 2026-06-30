const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapasync.js");

const listing = require("../models/listing.js")
const {isloggedin, isowner, validateListing} = require("../middleware.js")






// index route
router.get("/" ,wrapAsync(async (req, res)=>{
    const alllistings =await listing.find({});
    res.render("listings/index.ejs", {alllistings})
    await listing.find({}).then((res)=> {
        console.log("");
    })
}))

//new route
router.get("/new",isloggedin, (req, res ) =>{
    console.log(req.user);
    
    res.render("listings/new.ejs");
})


//create route
router.post("/" ,validateListing, wrapAsync(async(req ,res, next)=> {
    
    const newlis = new listing(req.body.listing)
    //here listing is mongoose.model
    console.log(req.user)
    newlis.owner = req.user._id;
    await newlis.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
}))

//show route
router.get("/:id" ,wrapAsync(async (req , res)=>{
    let {id} = req.params;
    const Listing =await listing.findById(id).populate({path : "reviews", populate : {
        path :"author", 
    }}).populate("owner");
    if(!Listing) {
        req.flash("error","Listing does not exist");
        res.redirect("/listings")
    }
    else res.render("listings/show.ejs", {Listing})
}))

//edit route
router.get("/:id/edit",isloggedin,isowner, wrapAsync(async (req,res)=>{
    const {id}= req.params;
    const list = await listing.findById(id);
    if(!list) {
        req.flash("error","Listing does not exist");
        res.redirect("/listings")
    }
    else res.render("listings/edit.ejs", {list});
}))

//returning to home page
router.get("/" , (req, res)=> {
    res.redirect("/listings");
})

//Update route
router.put("/:id" ,validateListing ,isloggedin,isowner,wrapAsync(async (req, res)=> {
    if(!req.body || !req.body.listing){
        throw new expressError(400, "Send valid data for listing");
    }
    const {id}= req.params;

    
    
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success","Listing updated");

    res.redirect(`/listings/${id}`);}
) )

//delete route
router.delete("/:id",isloggedin,isowner,wrapAsync(async (req,res)=> {
    const {id}= req.params;
    let dellist= await listing.findByIdAndDelete(id);
    console.log(dellist);
    req.flash("success","Listing deleted");

    res.redirect("/listings");
}))


module.exports = router; 