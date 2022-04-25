const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class Address extends Model {}
	Address.init(
		{
			address: {
				type: DataTypes.STRING,
				validate: {
					contains: {
						args: 'sydz',
						msg: 'dia chi phai chua sydz',
					},
				},
			},
			location: {
				type: DataTypes.INTEGER,
				validate: {
					isInt: {
						msg: 'location phai co dang integer',
					},
				},
			},
		},
		{
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			sequelize,
			modelName: 'address',
			tableName: 'address',
		},
	);
	return Address;
};
