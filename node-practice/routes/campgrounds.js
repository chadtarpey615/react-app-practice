const express = require('express');
const router = express.Router();
const Campground = require("../models/campground");
// const campground = require('../../yelpCamp/schemas');

router.get("/new", (req, res) => {
    res.render("campgrounds/new");

});

router.get("/", async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render("campgrounds/index", { campgrounds })
    // console.log("campground/index", campground)
});

router.get("/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    console.log("$$$$$$$$$$$$", campground._id)
    res.render("campgrounds/show", { campground });
})

router.post("/", async (req, res) => {

    const campground = new Campground(req.body.campground)
    // console.log("did it save", campground);

    await campground.save();
    res.redirect("campgrounds/new")
    // console.log(req.body.campground)
})

module.exports = router;