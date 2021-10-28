import React, { useState, useContext } from 'react'
import Card from "../../shared/components/UIElements/Card"
import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { useForm } from "../../shared/hooks/form-hook"
import { AuthContext } from "../../shared/context/auth-context"
import "./Auth.css"


const Auth = (props) => {
    const auth = useContext(AuthContext)
    const [isLogin, setIsLogin] = useState(true)


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


    const authSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs)
        auth.login()
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
        <Card className="authentication">
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

    )
}

export default Auth
