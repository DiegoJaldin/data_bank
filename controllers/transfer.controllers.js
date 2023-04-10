const Transfer = require('../models/transfer.models');
const User = require('../models/users.models');
const catchAsync = require('../utils/catchAsync');

exports.sendTransfer = catchAsync(async (req, res, next) => {
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

  // if(!userReceiver || !userSender){
  //   return res.status(400).json({
  //     status: 'error',
  //     message: 'This account number does not exist',
  //   })
  // };

  // if(userSender.accountNumber === userReceiver.accountNumber){
  //   return res.status(400).json({
  //     status: 'error',
  //     message: 'The sender account cant be the same as the receiver account',
  //   })
  // };

  // if(userSender.amount < amount){
  //   return res.status(400).json({
  //     status: 'error',
  //     message: 'Insuficient salary',
  //   })
  // };

  await Promise.all([
    userSender.update({
      amount: userSender.amount - amount
    }),

    userReceiver.update({
      amount: userReceiver.amount + amount
    })
  ]);

  await Transfer.create({
    amount,
    senderUserId: userSender.id,
    receiverUserId: userReceiver.id
  })

  res.status(201).json({
    status: 'success',
    message: 'The ammount transfer has been completed successfully',
  });
}); 