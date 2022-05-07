const UserController = require('../controllers/user.controller');
const userRoute = require('express').Router();

const router = require('./base.route')(userRoute, UserController, {
	detail: {
		isHide: false,
		permission: 'DETAIL_USER',
	},
	search: {
		isHide: false,
		permission: 'SEARCH_USER',
	},
	insert: {
		isHide: false,
		permission: 'CREATE_USER',
	},
	batchInsert: {
		isHide: false,
		permission: 'BULKCREATE_USER',
	},
	update: {
		isHide: false,
		permission: 'UPDATE_USER',
	},
	delete: {
		isHide: false,
		permission: 'DELETE_USER',
	},
});
userRoute.post('/login', (req, res, next) => UserController.login(req, res, next));
userRoute.post('/register', (req, res, next) => UserController.insert(req, res, next));
userRoute.get('/getManifestAndPermission', (req, res, next) => UserController.getManifestAndPermission(req, res, next));
userRoute.post('/addManifest', (req, res, next) => UserController.addManifest(req, res, next));
module.exports = router;
