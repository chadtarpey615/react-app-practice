import React, { useState, useContext } from 'react'
import Card from "../../shared/components/UIElements/Card"
import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { useForm } from "../../shared/hooks/form-hook"
import { AuthContext } from "../../shared/context/auth-context"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import "./Auth.css"


const Auth = (props) => {
    const auth = useContext(AuthContext)
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()


    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    }, false)


    const authSubmitHandler = async (event) => {
        event.preventDefault();

        if (isLogin) {

        } else {
            try {
                setIsLoading(true)
                const response = await fetch("http://localhost:5000/api/users/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                })
                const responseData = await response.json()
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                console.log(responseData)
                setIsLoading(false)
                auth.login()
            } catch (err) {
                console.log(err)
                setIsLoading(false)
                setError(err.message || "Something went wrong, please try again.")
            }
        }


    }

    const switchModeHandler = () => {
        if (!isLogin) {
            setFormData({
                ...formState.inputs,
                name: undefined,
            },
                formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                }
            }, false)
        }
        setIsLogin(prevMode => !prevMode)
    }

    const errorHandler = () => {
        setError(null)
    }

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLogin &&
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your Name"
                            validators={[VALIDATOR_REQUIRE]}
                            errorText="Please enter a name "
                            onInput={inputHandler}
                        />
                    }
                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="E-MAIL"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="please enter a valid email address"
                        onInput={inputHandler}
                    />

                    <Input
                        id="password"
                        element="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="please enter a valid password"
                        onInput={inputHandler}
                    />

                    <Button type="submit" disabled={!formState.isValid}>{isLogin ? "Log In" : "Sign Up"}</Button>

                </form>

                <Button inverse onClick={switchModeHandler}>Switch to {isLogin ? "Sign Up" : "Log In"}</Button>
            </Card>
        </>
    )
}

export default Auth
