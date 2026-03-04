const { body } = require("express-validator");

const registerValidation = [
  body("email").isEmail().withMessage("Email is required"),

  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .trim(),
  body("age")
    .isInt({ min: 18, max: 100 })
    .withMessage("Age must be between 18 and 100"),
    
  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender value"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .not()
    .contains(" ")
    .withMessage("Password should not contain spaces"),
];

module.exports = { registerValidation, loginValidation };
