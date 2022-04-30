const constantObject = require('../constant');

module.exports = {
	handleError: (error, res, modelName = '') => {
		console.log('xyz', error);
		if (error.name === constantObject.SQLIZE_VALIDATION_ERROR) {
			return res.status(400).json({
				error: error.errors.map((el) => ({ [el.path]: el.message })),
			});
		}
		if (error.name === constantObject.PARAMS_NUMBER_REQUIRED) {
			return res.status(400).json({
				error: error.message,
			});
		}
		if (error.name === constantObject.SQLIZE_UNIQUE_CONSTRAINT_ERROR) {
			return res.status(400).json({
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
			console.log('hint :  In the model define , check field tableName is match with the tableName in schema');
			return res.status(500).json({
				error: constantObject.SERVER_ERROR,
			});
		}

		return res.status(500).json({
			error: constantObject.SERVER_ERROR,
		});
	},
};
