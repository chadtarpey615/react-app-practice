import React from 'react'
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList"

const dummyPlaces = [
    {
        id: "p1",
        title: "Empire State Building",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAe1Lg2g2LI2TFIpcJYW5b-XcP8Bg8fFjG9w&usqp=CAU",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: "40.7484405",
            lng: "-73,9878584"
        },
        creator: "u1"
    },
    {
        id: "p2",
        title: "Empire State Building",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAe1Lg2g2LI2TFIpcJYW5b-XcP8Bg8fFjG9w&usqp=CAU",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: "40.7484405",
            lng: "-73,9878584"
        },
        creator: "u2"
    }
]
const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = dummyPlaces.filter(place => place.creator === userId)
    return (
        <PlaceList items={loadedPlaces} />
    )
}

export default UserPlaces
