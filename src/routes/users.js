// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {register,login,profile,processRegister,processLogin,logout} = require('../controllers/usersController');

// ************ Validations ************
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');

router.get('/register', register); 
router.post('/register', registerValidator,processRegister)
router.get('/login', login);
router.post('/login',loginValidator, processLogin);
router.get('/profile', profile);
router.get('/logout',logout)

module.exports = router;
