const express = require('express');
const userController = require('../controllers/user');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

// requireAuth is used to give authentication to different routes which means that they cant be accessed with a JWT Token

router.post('/signup', userController.postAddUser);

router.post('/signin', userController.postSignIn);

module.exports = router;
