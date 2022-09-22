const express = require('express');
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const { campgroundSchema } = require("../schemas");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, validateCampground, campgroundExists, isCampgroundAuthor } = require('../middleware');
const router = express.Router();
const mongoose = require('mongoose');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');

const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(campgroundExists, catchAsync(campgrounds.showCampground))
    .put(campgroundExists, isLoggedIn, isCampgroundAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(campgroundExists, isLoggedIn, isCampgroundAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', campgroundExists, isLoggedIn, isCampgroundAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;