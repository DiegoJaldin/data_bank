const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('The name slot cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage(`The password slot can't be empty`)
    .isLength({ min: 6 })
    .withMessage('The password must have at least 6 characters'),
  validFields,
];

exports.loginUserValidation = [
  body('accountNumber')
    .notEmpty()
    .withMessage('The account number slot cannot be empty')
    .isLength({ min: 6 })
    .withMessage('The account number must have at least 6 digits'),

  body('password')
    .notEmpty()
    .withMessage('The password slot cannot be empty')
    .isLength({ min: 6 })
    .withMessage('The password must have at least 6 characters'),
  validFields,
];

exports.transferValidation = [
  body('amount')
    .notEmpty()
    .withMessage('The amount cannot be empty')
    .isNumeric()
    .withMessage('The amount must be a number'),

  body('sender')
    .notEmpty()
    .withMessage('The sender slot cant be empty')
    .isLength({ min: 6 })
    .withMessage('The sender account must have 6 digits'),

  body('receiver')
    .notEmpty()
    .withMessage('The receiver slot vant be empty')
    .isLength({ min: 6 })
    .withMessage('The receiver account must have six digits'),

  validFields,
];
