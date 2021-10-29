const mongoose = require("mongoose")

const Schema = mongoose.Schema


const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // dont want to store images in the database bc of performance
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    creator: { type: String, required: true }
})

module.exports = mongoose.model("Place", placeSchema)