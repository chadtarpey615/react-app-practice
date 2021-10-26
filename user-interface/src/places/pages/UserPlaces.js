import React from 'react'
import PlaceList from "../components/PlaceList"

const dummyPlaces = [
    {
        id: "p1",
        title: "Empire State Building",
        imageUrl: "",
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
        imageUrl: "",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: "40.7484405",
            lng: "-73,9878584"
        },
        creator: "u2"
    }
]
const UserPlaces = () => {
    return (
        <PlaceList items={dummyPlaces} />
    )
}

export default UserPlaces
