const permissionController = require('../controllers/permission.controller');
const permissionRoute = require('express').Router();

const router = require('./base.route')(permissionRoute, permissionController);
// more router here
module.exports = router;
