const crypto = require('crypto-js');
const moment = require('moment');

const config = {
	userEmail: 'et.set.hust@gmail.com',
	passEmail: 'ktqbbzjobngdwwqg',
	urlTicket: 'https://qldt-demo.isofh.com/sis/ticket/',
	key: 'GALADINNER_2023_DTVT_TOT_NGHIEP',
};

const authMiddle = (req, res, next) => {
	try {
		console.log(req.headers.token, 'req.headers.token?');
		// const token = crypto.AES.decrypt(req.headers.token, config.key).toString(crypto.enc.Utf8);
		// console.log(token, moment(token).format(), '????', moment(token).date());
		// if (!moment(token).get('HH') || moment() > moment(token)) {
		// 	res.json({
		// 		code: 401,
		// 		message: 'Token invalid',
		// 	});
		// 	return;
		// }
		next();
	} catch (e) {
		console.log(e, 'e??');
		res.json({
			code: 401,
			message: 'Token invalid',
		});
	}
};

module.exports = { authMiddle, config };
