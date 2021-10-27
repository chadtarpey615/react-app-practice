import React from 'react'
import Input from "../../shared/components/FormElements/Input"
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators"
import Button from "../../shared/components/FormElements/Button"
import { useForm } from "../../shared/hooks/form-hook"
import "./PlaceForm.css"







const NewPlace = () => {
    const [formState, inputHandler] = useForm({
        title: {
            value: "",
            isValid: false
        },
        description: {
            value: "",
            isValid: false
        },
        address: {
            value: "",
            isValid: false
        },

    })



    const placeSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs) // send to back end 
    }

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a valid title"
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Desription"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="please enter a valid description at least 5 characters"
                onInput={inputHandler}
            />
            <Input
                id="address"
                element="input"
                label="address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a valid address"
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
        </form>
    )
}

export default NewPlace
