const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class SinhVienSaiMail extends Model {}

	SinhVienSaiMail.init(
		{
			ho_ten: {
				type: DataTypes.STRING(),
			},
			email: {
				type: DataTypes.STRING(),
			},
			sdt: {
				type: DataTypes.STRING(),
			},
		},
		{
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			sequelize,
			modelName: 'SinhVienSaiMail',
			tableName: 'sinh_vien_sai_mail',
		},
	);
	return SinhVienSaiMail;
};
