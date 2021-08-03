const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport")
const User = require("../models/user");

router.get("/register", (req, res) => {
    res.render("users/register")
});


// creating a new user to sign in 
router.post("/register", catchAsync(async (req, res) => {
    try {
        // destructure what we need from the req.body from the form 
        const { email, username, password } = req.body;
        // making a new User
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.flash("Welcome to yelp camp");
        res.redirect("/campgrounds")
    }
    catch (err) {
        req.flash("error", err.message)
        res.redirect("register")

    }

}));

router.get("/login", (req, res) => {
    res.render("users/login");
});


router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
    req.flash("success", "Welcome back");
    res.redirect("/campgrounds")
})

module.exports = router;