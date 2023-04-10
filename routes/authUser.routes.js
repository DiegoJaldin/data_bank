const express = require('express');

const { handleLoginErrors } = require('../middlewares/users.middlewares');
const authController = require('../controllers/authUser.controller');
const { loginUserValidation, createUserValidation } = require('../middlewares/validations.middleware');

const userRouter = express.Router();
userRouter.post('/register', createUserValidation, authController.register);

userRouter.post('/login', loginUserValidation, handleLoginErrors, authController.login);

module.exports = userRouter;
