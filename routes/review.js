const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../util/wrapasync.js");
const listing = require("../models/listing.js")
const Review = require("../models/review.js")
const {validateReview, isloggedin, isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/review.js");



//Reviews.    post route
router.post("/" ,validateReview, isloggedin, wrapAsync(reviewController.postReview))


//Delete review route
router.delete("/:reviewId" ,isReviewAuthor,isloggedin, wrapAsync(reviewController.destroyReview))


module.exports = router;