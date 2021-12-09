const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController")

router.post("/books", bookController.postBooks)
router.get("/books", bookController.getBooks)

module.exports = router