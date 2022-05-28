const ManifestController = require('../controllers/manifest.controller');
const { checkPermission } = require('../middlewares/author.middleware');
const verifyToken = require('../middlewares/authen.middleware');
const manifestRoute = require('express').Router();

const router = require('./base.route')(manifestRoute, ManifestController, {
	detail: {
		isHide: true,
	},
	search: {
		isHide: false,
		permission: 'SEARCH_MANIFEST',
	},
	insert: {
		isHide: true,
		permission: 'CREATE_MANIFEST',
	},
	batchInsert: {
		isHide: true,
		permission: '',
	},
	update: {
		isHide: false,
		permission: 'UPDATE_MANIFEST',
	},
	delete: {
		isHide: false,
		permission: 'DELETE_MANIFEST',
	},
});
manifestRoute.post(
	'/insert',
	(req, res, next) => verifyToken(req, res, next),
	(req, res, next) => checkPermission('CREATE_MANIFEST', req, res, next),
	(req, res, next) => ManifestController.addPermission(req, res, next),
);
module.exports = router;
