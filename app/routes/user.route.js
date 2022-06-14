const UserController = require('../controllers/user.controller');
const userRoute = require('express').Router();
const verifyToken = require('../middlewares/authen.middleware');
const { checkResourceOwner, checkPermission } = require('../middlewares/author.middleware');
const { s3Upload } = require('../config/s3.config');
const { appUserTypeConst } = require('../constant');

userRoute.post('/login', (req, res, next) => UserController.login(req, res, next));
userRoute.post('/register', (req, res, next) => UserController.insert(appUserTypeConst.customer, req, res, next));
userRoute.put(
	'/self-update/:id',
	(req, res, next) => verifyToken(req, res, next),
	(req, res, next) => checkResourceOwner(req, res, next, true),
	(req, res, next) => UserController.updateSelf(req, res, next),
);
userRoute.put(
	'/self-update/avatar/:id',
	(req, res, next) => verifyToken(req, res, next),
	(req, res, next) => checkResourceOwner(req, res, next, true),
	() => s3Upload.single('file'),
	(req, res, next) => UserController.updateSelfAvatar(req, res, next),
);
userRoute.get(
	'/info',
	(req, res, next) => verifyToken(req, res, next),
	(req, res, next) => UserController.info(req, res, next),
);
userRoute.post(
	'/change-password',
	(req, res, next) => verifyToken(req, res, next),
	(req, res, next) => UserController.changePassword(req, res, next),
);
userRoute.post('/forgot-password', (req, res, next) => UserController.forgotPassword(req, res, next));
userRoute.get('/reset-password/:tokenReset', (req, res, next) => UserController.confirmResetPw(req, res, next));

module.exports = userRoute;
