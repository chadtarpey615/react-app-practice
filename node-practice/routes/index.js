const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("../views/home/index.ejs")
});

router.get("/stadium", (req, res) => {
    res.render("../views/stadiums")
})
module.exports = router;