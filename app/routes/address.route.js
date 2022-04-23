const addressController = require('../controllers/address.controller');
const addressRoute = require('express').Router();

const router = require('./base.route')(addressRoute, addressController, 'address');
// more router here
module.exports = router;
