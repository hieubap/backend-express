const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class SinhVien extends Model {}

	SinhVien.init(
		{
			hoTen: {
				type: DataTypes.STRING(),
			},
			email: {
				type: DataTypes.STRING(),
			},
			sdt: {
				type: DataTypes.STRING(),
			},
			status: {
				type: DataTypes.NUMBER(),
			},
			checked_at: {
				type: DataTypes.TIME(),
			},
			sended_at: {
				type: DataTypes.TIME(),
			},
		},
		{
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			sequelize,
			modelName: 'SinhVien',
			tableName: 'sinh_vien',
		},
	);
	return SinhVien;
};
