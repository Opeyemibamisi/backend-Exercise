const express = require("express");
const { register, login, verify } = require("../controller/user");
const { registerValidation, loginValidation } = require("../validator/user");

const router = express.Router();

// router.post("/register", register);

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

// use controller's verify handler rather than jwt.verify
router.get("/verify/:token", verify);

module.exports = router;
