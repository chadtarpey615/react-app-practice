const User = require("../models/user")
const HttpError = require("../models/http-error")
const { validationResult } = require("express-validator")


const getUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find({}, "-password")

    } catch (err) {
        const error = new HttpError("Fetching users failed,please try again", 500)
        return next(error)
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) })
}


/////////////sign up////////////////

const signup = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)

        return next(new HttpError("Invalid inputs, please check your singup info", 422))
    }

    const { name, email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })

    } catch (err) {
        const error = new HttpError("Signing up failed, please try again", 500)
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError("User exist already,please log in instead", 422)
        return next(error)
    }



    const createdUser = new User({
        name,
        email,
        image: "https://live.staticflickr.com/7631/26849088292_36fc52ee90+b.jpg",
        password,
        places: []
    })

    try {
        await createdUser.save()

    } catch (error) {
        const err = new HttpError("Signing up user failed,  please try again", 500)
        return next(error)
    }
    res.status(201).json({ user: createdUser.toObject({ getters: true }) })
}


////////////login//////////////////

const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })

    } catch (err) {
        const error = new HttpError("Login failed, please try again", 500)
        return next(error)
    }


    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError("Invalid credentials, could not login", 401)
        return next(error)
    }

    res.json({ message: "Logged In!" })
}





exports.getUsers = getUsers
exports.signup = signup
exports.login = login



