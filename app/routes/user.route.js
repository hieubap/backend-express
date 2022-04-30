const UserController = require('../controllers/user.controller');
const userRoute = require('express').Router();

const router = require('./base.route')(userRoute, UserController, 'user');
userRoute.post('/login', (req, res, next) => UserController.login(req, res, next));
module.exports = router;
