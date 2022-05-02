const authenMiddle = require('../middlewares/authen.middleware');
const authorMiddle = require('../middlewares/author.middleware');

const defaultOptions = {
	detail: {
		isHide: false,
		permission: false,
	},
	search: {
		isHide: false,
		permission: false,
	},
	insert: {
		isHide: false,
		permission: false,
	},
	batchInsert: {
		isHide: false,
		permission: false,
	},
	update: {
		isHide: false,
		permission: false,
	},
	delete: {
		isHide: false,
		permission: false,
	},
};

module.exports = (router, controller, options = defaultOptions) => {
	router.use(async (req, res, next) => {
		console.log('Time: ', new Date().toLocaleString());
		next();
	});
	!options.detail.isHide &&
		router.get(
			'/detail/:id',
			(req, res, next) => authenMiddle(req, res, next),
			(req, res, next) => authorMiddle(options.detail.permission, req, res, next),
			(req, res, next) => {
				controller.detail(req, res, next);
			},
		);

	!options.search.isHide &&
		router.get(
			'/search',
			(req, res, next) => authenMiddle(req, res, next),
			(req, res, next) => authorMiddle(options.search.permission, req, res, next),
			(req, res, next) => {
				controller.search(req, res, next);
			},
		);

	!options.insert.isHide &&
		router.post(
			'/insert',
			(req, res, next) => authenMiddle(req, res, next),
			(req, res, next) => authorMiddle(req.permission.includes(options.insert.permission), req, res, next),
			(req, res, next) => {
				controller.insert(req, res, next);
			},
		);
	!options.batchInsert.isHide &&
		router.post(
			'/batch-insert',
			(req, res, next) => authenMiddle(req, res, next),
			(req, res, next) => authorMiddle(options.batchInsert.permission, req, res, next),
			(req, res, next) => {
				controller.batchInsert(req, res, next);
			},
		);

	!options.update.isHide &&
		router.put(
			'/update/:id',
			(req, res, next) => authenMiddle(req, res, next),
			(req, res, next) => authorMiddle(options.update.permission, req, res, next),
			(req, res, next) => {
				controller.update(req, res, next);
			},
		);

	!options.delete.isHide &&
		router.delete(
			'/delete/:id',
			(req, res, next) => authenMiddle(req, res, next),
			(req, res, next) => authorMiddle(options.delete.permission, req, res, next),
			(req, res, next) => {
				controller.delete(req, res, next);
			},
		);
	return router;
};
