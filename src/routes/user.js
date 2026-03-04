const express = require("express");
const { register, login } = require("../controller/user");
const { registerValidation, loginValidation } = require("../validator/user");

const router = express.Router();

// router.post("/register", register);

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;
