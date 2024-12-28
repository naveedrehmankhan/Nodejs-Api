const express = require('express');
const router = express.Router();
const req = require('express/lib/request');


const registerController = require('./auth_controller/register');
router.use('/register', registerController);



const loginController = require('./auth_controller/login');
router.use('/login', loginController);

const bookShowController = require('./books/get_show');
router.use('/books', bookShowController);

module.exports = router;