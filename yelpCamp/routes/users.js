const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport")
const User = require("../models/user");

router.get("/register", (req, res) => {
    res.render("users/register")
});


// creating a new user to sign in 
router.post("/register", catchAsync(async (req, res, next) => {
    try {
        // destructure what we need from the req.body from the form 
        const { email, username, password } = req.body;
        // making a new User
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, err => {
            if (err) return next(err);
        })
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
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl)
});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Goodbye");
    res.redirect("/campgrounds")
})

module.exports = router;