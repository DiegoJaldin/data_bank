const Transfer = require('../models/transfer.models');
const User = require('../models/users.models');
const AppError = require('../utils/app.error');
const catchAsync = require('../utils/catchAsync');


exports.handlerSendTransferError = catchAsync(async (req, res, next) => {
  const { amount, sender, receiver } = req.body

  const userSender = await User.findOne({
    where:{
      accountNumber: sender,
    }
  });

  const userReceiver = await User.findOne({
    where:{
      accountNumber: receiver,
    }
  });
  
  if(!userReceiver || !userSender){
    return next(new AppError(
      'This account number does not exist', 404
      )) 
    };

  if(userSender.accountNumber === userReceiver.accountNumber){
    return next(new AppError(
      'The sender account cant be the same as the receiver account', 404
      )) 
    }

  if(userSender.amount < amount){
    return next(new AppError(
      'Insuficient salary', 404
      )) 
    };

  req.userSender = userSender;
  req.userReceiver = userReceiver;
  next();
}); 