const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../util/wrapasync.js");
const {reviewschema} = require("../schema.js");
const expressError = require("../util/expressError.js");
const listing = require("../models/listing.js")
const Review = require("../models/review.js")


const validateReview = (req, res, next) =>{
    let {error} = reviewschema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el)=> el.message).join(",");

        throw new expressError(400, errmsg);
    }
    else next();
}


//Reviews.    post route
router.post("/" ,validateReview, wrapAsync(async(req,res)=> {
    const id = req.params.id;
    console.log(req.params.id);
    let thslisting = await listing.findById(req.params.id);
    let newreview = new Review (req.body.review);
    
    thslisting.reviews.push(newreview);
    await newreview.save();
    await thslisting.save();
    console.log(req.body);
    console.log(req.params);
    req.flash("success","New review created");

    console.log("New review saved")
    res.redirect(`/listings/${id}`);
}))


//Delete review route
router.delete("/:reviewId" , wrapAsync(async (req, res, next) => {
    let {id , reviewId} = req.params;
    await Review.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`)
}))


module.exports = router;