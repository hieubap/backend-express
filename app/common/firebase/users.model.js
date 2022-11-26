const { defineModel, DataTypes } = require('firestore-sequelize');
const FirebaseUser = defineModel('users', {
	name: {
		type: DataTypes.STRING,
	},
	born: {
		type: 'number',
	},
});
module.exports = FirebaseUser;