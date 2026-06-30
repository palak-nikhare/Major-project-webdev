const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapasync.js");

const listing = require("../models/listing.js")
const {isloggedin, isowner, validateListing} = require("../middleware.js")

const listingController = require("../controllers/listing.js");



router.route("/")
    .get(wrapAsync(listingController.index))
    .post(validateListing, wrapAsync(listingController.create));


//new route
router.get("/new",isloggedin, listingController.renderNewForm );


router.route("/:id")
    .get(wrapAsync(listingController.show))
    .put(validateListing ,isloggedin,isowner,wrapAsync(listingController.updateListings) )
    .delete(isloggedin,isowner,wrapAsync(listingController.destroyListing))


//edit route
router.get("/:id/edit",isloggedin,isowner, wrapAsync(listingController.edit));


module.exports = router; 