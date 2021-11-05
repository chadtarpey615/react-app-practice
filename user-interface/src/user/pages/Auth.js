import React, { useState, useContext } from 'react'
import Card from "../../shared/components/UIElements/Card"
import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import ImageUpload from "../../shared/components/FormElements/ImageUpload"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { useForm } from "../../shared/hooks/form-hook"
import { AuthContext } from "../../shared/context/auth-context"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/http-hook"
import "./Auth.css"


const Auth = (props) => {
    const auth = useContext(AuthContext)
    const [isLogin, setIsLogin] = useState(true)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()


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

        console.log(formState.inputs)

        if (isLogin) {
            try {
                const responseData = await sendRequest("http://localhost:5000/api/users/login",
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        "Content-Type": "application/json"
                    },

                )
                auth.login(responseData.user.id)

            } catch (error) {
                console.log(error)
            }




        } else {
            try {
                const responseData = await sendRequest("http://localhost:5000/api/users/signup",
                    "POST",
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        "Content-Type": "application/json"
                    },

                )

                auth.login(responseData.user.id)
            }
            catch (err) {
                console.log(err)

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



    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
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
                    {!isLogin && <ImageUpload center id="image" onInput={inputHandler} />}
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
