const listing = require("../models/listing.js");

module.exports.index = async (req, res)=>{
    const alllistings =await listing.find({});
    res.render("listings/index.ejs", {alllistings})
    await listing.find({}).then((res)=> {
        console.log("");
    })
};

module.exports.renderNewForm = (req, res ) =>{
    console.log(req.user);
    
    res.render("listings/new.ejs");
} 

module.exports.create = async(req ,res, next)=> {
    
    const newlis = new listing(req.body.listing)
    //here listing is mongoose.model
    console.log(req.user)
    newlis.owner = req.user._id;
    await newlis.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
}

module.exports.show = async (req , res)=>{
    let {id} = req.params;
    const Listing =await listing.findById(id).populate({path : "reviews", populate : {
        path :"author", 
    }}).populate("owner");
    if(!Listing) {
        req.flash("error","Listing does not exist");
        res.redirect("/listings")
    }
    else res.render("listings/show.ejs", {Listing})
}

module.exports.get = async (req,res)=>{
    const {id}= req.params;
    const list = await listing.findById(id);
    if(!list) {
        req.flash("error","Listing does not exist");
        res.redirect("/listings")
    }
    else res.render("listings/edit.ejs", {list});
}

module.exports.updateListings = async (req, res)=> {
    if(!req.body || !req.body.listing){
        throw new expressError(400, "Send valid data for listing");
    }
    const {id}= req.params;

    await listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success","Listing updated");

    res.redirect(`/listings/${id}`);}


module.exports.destroyListing = async (req,res)=> {
    const {id}= req.params;
    let dellist= await listing.findByIdAndDelete(id);
    console.log(dellist);
    req.flash("success","Listing deleted");

    res.redirect("/listings");
}