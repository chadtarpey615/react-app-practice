const express = require('express');
const router = express.Router();
const Campground = require("../models/campground");
// const campground = require('../../yelpCamp/schemas');

router.get("/new", (req, res) => {
    res.render("campgrounds/new")
});

router.post("/", async (req, res) => {
    // const campground = new Campground({
    //     title: req.body.title,
    //     price: req.body.price,
    //     description: req.body.description,
    //     location: req.body.location,

    // });
    const campground = new Campground(req.body.campground)
    console.log("did it save", campground);

    await campground.save();
    res.redirect("campgrounds/new")
    console.log(req.body.campground)
})

module.exports = router;