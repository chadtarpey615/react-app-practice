const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.getAddUser = (req, res) => {
    res.render('add-user');
};


exports.postAddUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, `${process.env.SECRET}`);
        res.send({ token: token });
        console.log('User Added with token:', token);
    } catch (error) {
        console.log(error.message);
        return res.status(422).send(error.message);
    }
};


exports.getUser = (req, res) => {
    res.send(`Your email: ${req.user.email}`);
};

exports.postSignIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ error: 'Email not found' });
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, `${process.env.SECRET}`);
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
};
