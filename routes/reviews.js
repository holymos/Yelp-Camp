const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../Utilities/catchAsync");
const ExpressError = require("../Utilities/ExpressError");
const Campground = require("../models/campground");
const Review = require("../models/reviews");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviews = require('../controllers/reviews');


router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
