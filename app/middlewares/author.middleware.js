const { constant, statusCode } = require('../constant');
const BaseController = require('../controllers/base.controller');

async function checkPermission(permissionRequired, req, res, next) {
	try {
		const listPermission = await BaseController.checkRequestPermission(req.id);
		if (listPermission.map((permission) => permission.name).includes(permissionRequired) || !permissionRequired) {
			next();
		} else res.status(statusCode.NOT_AUTHOR_CODE).json({ msg: constant.PERMISSION_DENIED });
	} catch (e) {
		res.status(statusCode.SERVER_ERROR_CODE).json({ msg: constant.SERVER_ERROR });
	}
}

async function checkResourceOwner(req, res, next) {
	if (req.params.id === req.id) {
		req.isOwner = true;
		next();
	} else {
		res.status(statusCode.NOT_AUTHOR_CODE).json({ msg: constant.NO_AUTHORIZE });
	}
}

module.exports = {
	checkPermission,
	checkResourceOwner,
};
