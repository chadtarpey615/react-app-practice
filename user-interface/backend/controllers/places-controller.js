const HttpError = require("../models/http-error")
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require("express-validator")
const getCoordsForAddress = require("../util/location")
const Place = require("../models/place")


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

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid

    let place
    try {
        place = await Place.findById(placeId)

    } catch (err) {
        const error = new HttpError("Something went wrong, could not find a place", 500)
        return next(error)
    }

    if (!place) {
        const error = new HttpError("Could not find place for provided id", 404)
        return next(error)
    }


    res.json({ place })
}

const getPlacesByUserId = (req, res, next) => {

    const userId = req.params.uid
    const places = dummyPlaces.filter(p => {
        return p.creator === userId
    })

    if (!places || places.length === 0) {
        return next(
            new HttpError("Could not find places for provided user id", 404)
        )


    }

    res.json({ places })

}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)

        next(new HttpError("Invalid inputs, please check your data", 422))
    }

    const { title, description, address, creator } = req.body

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address)

    } catch (error) {
        return next(error)
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAe1Lg2g2LI2TFIpcJYW5b-XcP8Bg8fFjG9w&usqp=CAU",
        creator
    })
    // with no database
    // dummyPlaces.push(createdPlace) 

    // with database
    try {
        await createdPlace.save()

    } catch (error) {
        const err = new HttpError("Creating place failed please try again", 500)
        return next(error)
    }

    res.status(201).json({ place: createdPlace })
}

const updatePlace = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)

        throw new HttpError("Invalid inputs, please check your data", 422)
    }


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
    if (!dummyPlaces.find(p => p.id === placeId)) {
        throw new HttpError("Could not find a place for that id")
    }
    dummyPlaces = dummyPlaces.filter(p => p.id !== placeId)
    res.status(200).json({ message: "Deleted place" })
}



exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace