const constant = require('../constant');
const BaseController = require('../controllers/base.controller');

async function checkPermission(permissionRequired, req, res, next) {
	try {
		const listPermission = await BaseController.checkRequestPermission(req.id);
		if (listPermission.map((permission) => permission.name).includes(permissionRequired) || !permissionRequired) {
			next();
		} else res.status(403).json({ msg: constant.PERMISSION_DENIED });
	} catch (e) {
		res.status(500).json({ msg: constant.SERVER_ERROR });
	}
}

module.exports = checkPermission;
