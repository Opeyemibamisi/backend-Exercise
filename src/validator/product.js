const { body } = require("express-validator");

const productValidator = [
  body('title')
    .notEmpty().withMessage('Product title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters long')
    .trim().escape(), 
  body('description')
    .optional() 
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
    .trim().escape(),
  body('price')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number')
    .notEmpty().withMessage('Product price is required'),
  body('category')
    .notEmpty().withMessage('Product category is required')
    .trim().escape(),
];

const updateProductValidator = [
  body('title')
    .optional()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters long')
    .trim().escape(), 
  body('description')
    .optional() 
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
    .trim().escape(),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category')
    .optional()
    .trim().escape(),
];

module.exports = { productValidator, updateProductValidator };