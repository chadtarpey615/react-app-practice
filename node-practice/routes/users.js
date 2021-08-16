const express = require('express');
const router = express.Router();
const User = require("../models/users");



router.get("/register", (req, res) => {
  res.render("users/register")
});

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const newUser = await new User({ email, username })
  await newUser.save();
  res.redirect("/campgrounds")
})

module.exports = router;