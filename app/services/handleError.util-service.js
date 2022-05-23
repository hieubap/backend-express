const { constant: constantObject, statusCode } = require('../constant');

module.exports = {
	handleError: (error, res) => {
		console.log('xyz', error);
		if (error.name === constantObject.SQLIZE_VALIDATION_ERROR) {
			return res.status(statusCode.BAD_REQUEST_CODE).json({
				error: error.errors.map((el) => ({ [el.path]: el.message })),
			});
		}
		if (error.name === constantObject.PARAMS_NUMBER_REQUIRED) {
			return res.status(statusCode.BAD_REQUEST_CODE).json({
				error: error.message,
			});
		}
		if (error.name === constantObject.SQLIZE_UNIQUE_CONSTRAINT_ERROR) {
			return res.status(statusCode.BAD_REQUEST_CODE).json({
				error: error.errors.map((el) => {
					const tmp = el.path.split('_');
					tmp.pop();
					tmp.shift();
					const keyName = tmp.length > 1 ? tmp.join('-') : tmp;
					return {
						[keyName]: `${el.value} đã được sử dụng trong hệ thống`,
					};
				}),
			});
		}
		// more if block code
		if (error.name === constantObject.SQLIZE_DB_NAME_ERROR) {
			if (error.code === 'ER_BAD_FIELD_ERROR') {
				console.log('fields not match');
			}
			return res.status(statusCode.SERVER_ERROR_CODE).json({
				error: constantObject.SERVER_ERROR,
			});
		}

		return res.status(statusCode.SERVER_ERROR_CODE).json({
			error: constantObject.SERVER_ERROR,
		});
	},
};
