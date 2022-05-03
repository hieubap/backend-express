const manifestController = require('../controllers/manifest.controller');
const manifestRoute = require('express').Router();

const router = require('./base.route')(manifestRoute, manifestController);
// more router here
module.exports = router;
