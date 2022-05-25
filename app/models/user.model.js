const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class User extends Model {}

	User.init(
		{
			user_name: {
				type: DataTypes.STRING(20),
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Username không được để trống',
					},
					len: {
						args: [3, 24],
						msg: 'Đô dài tối thiếu 3 kí tự , tối đa 24 kí tự',
					},
				},
				unique: true,
			},
			full_name: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					notNull: {
						msg: 'FullName không được để trống',
					},
				},
			},
			phone_number: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true,
				validate: {
					// notNull: {
					// 	msg: 'Email không được để trống',
					// },
					is: {
						args: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
						msg: 'Số điện thoại không đúng định dạng',
					},
				},
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
				validate: {
					notNull: {
						msg: 'Email không được để trống',
					},
					isEmail: {
						msg: 'Email không đúng định dạng',
					},
				},
			},
			password: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Password không được để trống',
					},
					len: {
						args: [6, 50],
						msg: 'Đô dài tối thiếu 6 kí tự',
					},
				},
			},
			contact: {
				type: DataTypes.STRING(255),
			},
			avatar: {
				type: DataTypes.STRING(255),
			},
			note: {
				type: DataTypes.STRING(255),
			},
			is_active: {
				type: DataTypes.TINYINT,
				defaultValue: 1,
			},
			token: {
				type: DataTypes.STRING,
			},
			token_reset_pw: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			sequelize,
			modelName: 'user',
			tableName: 'user',
		},
	);
	return User;
};
