const AddressController = require('../controllers/address.controller');
const userRoute = require('express').Router();

const router = require('./base.route')(userRoute, AddressController, 'user');
module.exports = router;
