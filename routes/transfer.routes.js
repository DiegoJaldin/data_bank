const express = require('express');

const { handlerSendTransferError } = require('../middlewares/transfers.middlewares');
const transferRouter = express.Router();

const transferController = require('../controllers/transfer.controllers');
const { transferValidation } = require('../middlewares/validations.middleware');

transferRouter.post('/', transferValidation, handlerSendTransferError, transferController.sendTransfer);

module.exports = transferRouter;