const jwtUtilModel = require('../models/jwt.util-model');
const constant = require('../constant');

async function verifyToken(req, res, next) {
	try {
		const token = req.headers.authorization.replace('Bearer ', '');
		const { id, exp } = await jwtUtilModel.verify(token);
		if (new Date().getTime() / 1000 > exp) {
			res.status(401).json({ msg: constant.TOKEN_EXPIRE });
		}
		req.id = id;
		next();
	} catch (e) {
		res.status(401).json({ msg: constant.TOKEN_INVALID });
	}
}

module.exports = verifyToken;
