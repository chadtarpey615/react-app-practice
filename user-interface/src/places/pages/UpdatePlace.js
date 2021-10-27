import React from 'react'
import { useParams } from "react-router-dom"
import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators"
import { useForm } from "../../shared/hooks/form-hook"
import "./PlaceForm.css"


const dummyPlaces = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sku scrapers in the world!",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAe1Lg2g2LI2TFIpcJYW5b-XcP8Bg8fFjG9w&usqp=CAU",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: "u1"
    },
    {
        id: "p2",
        title: "Empire State Building",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAe1Lg2g2LI2TFIpcJYW5b-XcP8Bg8fFjG9w&usqp=CAU",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: "u2"
    }
]


const UpdatePlace = () => {

    const placeId = useParams().placeId



    const identifiedPlace = dummyPlaces.find(p => p.id === placeId)

    const [formState, inputHandler] = useForm({
        title: {
            value: identifiedPlace.title,
            isValid: true
        },
        description: {
            value: identifiedPlace.description,
            isValid: true
        }
    }, true)

    const placeUpdateSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    if (!identifiedPlace) {
        return <div className="center">Could not find place!</div>
    }
    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description"
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
        </form>
    )
}

export default UpdatePlace
