const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController.js");


router.post("/register", async (req, res) => {
    AuthController.register(req, res);
})

router.post("/login", async (req, res) => {
    AuthController.login(req, res);
})


module.exports = router;
