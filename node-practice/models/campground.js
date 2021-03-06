const mongoose = require("mongoose");


const CampgroundSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String
});

module.exports = mongoose.model("Campground", CampgroundSchema);