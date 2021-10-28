const HttpError = require("../models/http-error")
const { v4: uuidv4 } = require('uuid');


let dummyPlaces = [
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

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }
    dummyPlaces.push(createdPlace)

    res.status(201).json({ place: createdPlace })
}

const updatePlace = (req, res, next) => {
    const { title, description } = req.body
    const placeId = req.params.pid

    const updatedPlace = { ...dummyPlaces.find(p => p.id === placeId) }
    const placeIndex = dummyPlaces.findIndex(p => p.id === placeId)
    updatedPlace.title = title;
    updatedPlace.description = description

    dummyPlaces[placeIndex] = updatedPlace

    res.status(200).json({ place: updatedPlace })


}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid
    dummyPlaces = dummyPlaces.filter(p => p.id !== placeId)
    res.status(200).json({ message: "Deleted place" })
}
exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace