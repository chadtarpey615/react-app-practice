const express = require("express")
const router = express.Router()


const dummyPlaces = [
    {
        id: "p1",
        title: "empire state building",
        description: "One of the most famous buildings",
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: "20 W 34th St, New York, NY 10001",
        creator: "u1"
    }
]
router.get("/:pid", (req, res, next) => {
    const placeId = req.params.pid
    const place = dummyPlaces.find(p => {
        return p.id === placeId
    })
    res.json({ place })
})

module.exports = router