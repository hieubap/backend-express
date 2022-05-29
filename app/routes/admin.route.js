const UserController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/authen.middleware');
const { checkPermission } = require('../middlewares/author.middleware');

module.exports = (router, options) => {
	router.post(
		'/insert',
		(req, res, next) => verifyToken(req, res, next),
		(req, res, next) => checkPermission(options.insert.permission, req, res, next),
		(req, res, next) => UserController.insert(options.insert.userType, req, res, next),
	);
	router.put(
		'/update/:id',
		(req, res, next) => verifyToken(req, res, next),
		(req, res, next) => checkPermission(options.update.permission, req, res, next),
		(req, res, next) => UserController.update(options.update.userType, req, res, next),
	);
	router.get(
		'/detail/:id',
		(req, res, next) => verifyToken(req, res, next),
		(req, res, next) => checkPermission(options.detail.permission, req, res, next),
		(req, res, next) => UserController.detail(options.detail.userType, req, res, next),
	);
	router.delete(
		'/delete/:id',
		(req, res, next) => verifyToken(req, res, next),
		(req, res, next) => checkPermission(options.delete.permission, req, res, next),
		(req, res, next) => UserController.delete(options.delete.userType, req, res, next),
	);
	router.get(
		'/search',
		(req, res, next) => verifyToken(req, res, next),
		(req, res, next) => checkPermission(options.search.permission, req, res, next),
		(req, res, next) => UserController.search(options.search.userType, req, res, next),
	);
	return router;
};
