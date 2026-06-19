const express = require('express');
const loginController = require('../controller/authController');
const authRouter = express.Router();

authRouter.post('/login', loginController);
authRouter.post('/signup', (req, res) => {
    res.send("You are signed up");
});

module.exports = authRouter;