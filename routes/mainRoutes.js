const express = require("express")
const router = express.Router()
const homeController = require("../controller/home")
const authController = require("../controller/auth")
const User = require('../models/Users')

router.get("/", homeController.getHome)
// Login Page
router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin)
router.get("/logout", authController.logout)
// Register Page
router.get("/register", authController.getRegister)
router.post("/register", authController.postRegister)

module.exports = router
