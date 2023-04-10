const User = require('../models/users.models');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const user = await User.create({
      name,
      password,
  });

  console.log(req.body)

  res.status(201).json({
    status: 'success',
    message: 'The user has been created successfully',
    user,
  });
}); 


exports.login = catchAsync(async(req, res) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
      status: 'active',
    },
  });

  // if(!user) 
  //   return res.status(404).json({
  //     status: 'error',
  //     message: 'Invalid password or account number',
  //   });

  res.status(201).json({
    status: 'success',
    message: 'Loging successfully',
    user,
  })
    
}); 