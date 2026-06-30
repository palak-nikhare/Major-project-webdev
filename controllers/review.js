const listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.postReview = async(req,res)=> {
    const id = req.params.id;
    console.log(req.params.id);
    let thslisting = await listing.findById(req.params.id);
    let newreview = new Review (req.body.review);
        newreview.author = req.user._id;
    console.log(newreview);
    
    thslisting.reviews.push(newreview);
    await newreview.save();
    await thslisting.save();
    console.log(req.body);
    console.log(req.params);
    req.flash("success","New review created");

    console.log("New review saved")
    res.redirect(`/listings/${id}`);
}

module.exports.destroyReview = async (req, res, next) => {
    let {id , reviewId} = req.params;
    await Review.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`)
}