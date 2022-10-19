const userController = require("../controllers/users.controllers");

const express = require("express");
const router =express.Router()


//post routes for login and register
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/user_profile", userController.userProfile);

module.exports= router;