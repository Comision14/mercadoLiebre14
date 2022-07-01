// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {register,login,profile,processRegister,processLogin,logout, update} = require('../controllers/usersController');

// ************ Requiero multer ************
const {uploadImgUser} = require('../middlewares/upImages')

// ************ Validations ************
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const userCheck = require('../middlewares/userCheck');

router
    .get('/register', register)
    .post('/register', registerValidator,processRegister)
    .get('/login', login)
    .post('/login',loginValidator, processLogin)
    .get('/profile',userCheck, profile)
    .put('/update',userCheck,uploadImgUser.single('image'),update)
    .get('/logout',logout)

module.exports = router;
