const express = require('express');
const router = express.Router();
const Campground = require("../models/campground");
const { campgroundSchema } = require('../../yelpCamp/schemas');

router.get("/new", (req, res) => {
    res.render("campgrounds/new")
});

router.post("/new", async (req, res) => {
    const campground = new Campground({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        location: req.body.location,

    });
    console.log("did it save", campground);

    await campground.save();
})

module.exports = router;