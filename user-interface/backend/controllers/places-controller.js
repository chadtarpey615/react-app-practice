const HttpError = require("../models/http-error")



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

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid
    const place = dummyPlaces.find(p => {
        return p.id === placeId
    })

    if (!place) {
        throw new HttpError("Could not find place for provided id", 404)

    }


    res.json({ place })
}

const getPlaceByUserId = (req, res, next) => {
    (req, res, next) => {
        const userId = req.params.uid
        const place = dummyPlaces.find(p => {
            return p.creator === userId
        })

        if (!place) {
            return next(
                new HttpError("Could not find place for provided user id", 404)
            )


        }

        res.json({ place })
    }
}

exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId