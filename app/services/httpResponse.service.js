const constantObject = require('../constant');

module.exports = {
	handleError: (error, res) => {
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
