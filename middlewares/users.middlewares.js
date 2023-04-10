const User = require('../models/users.models');
const AppError = require('../utils/app.error');
const catchAsync = require('../utils/catchAsync');

exports.handleLoginErrors = catchAsync(async(req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
      status: 'active',
    },
  });

  if(!user) 
    {
      return next(new AppError(
        "Incorrect login", 404
      ))
    };
  req.user = user;
  next();    
}); 