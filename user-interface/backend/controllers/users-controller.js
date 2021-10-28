const { v4: uuidv4 } = require('uuid');
const HttpError = require("../models/http-error")
const { validationResult } = require("express-validator")

const dummyUser = [
    {
        id: "u1",
        name: "Chad Tarpey",
        email: "chad@gmail.com",
        password: "test"
    }
]


const getUsers = (req, res, next) => {
    res.json({ users: dummyUser })
}

const signup = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)

        throw new HttpError("Invalid inputs, please check your singup info", 422)
    }

    const { name, email, password } = req.body

    const hasUser = dummyUser.find(u => u.email === email)
    if (hasUser) {
        throw new HttpError("User already has an account", 401)

    }

    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    }

    dummyUser.push(createdUser)
    res.status(201).json({ user: createdUser })
}

const login = (req, res, next) => {
    const { email, password } = req.body

    const identifiedUser = dummyUser.find(u => u.email === email)
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError("Could not identify user, credentials failed", 401)
    }
    res.json({ message: "Logged In" })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login