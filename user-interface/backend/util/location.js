const axios = require("axios")
const HttpError = require("../models/http-error")

const API_KEY = "AIzaSyBvKUAsZB1wNihLzye3C65occK5CD9zpI4"

async function getCoordsForAddress(address) {
    // fall back if maps api key does not work
    // return {
    //     lat: 40.748474,
    //     lng: -73.9871516
    // }


    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)

    const data = response.data

    if (!data || data.status === "ZERO_RESULTS") {
        const error = new HttpError("Could not found location ", 422)
        throw error


    }
    const coordinates = data.results[0].geometry.location

    return coordinates
}

module.exports = getCoordsForAddress