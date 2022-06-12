const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class SensorDevice extends Model {}

	SensorDevice.init(
		{
			macId: {
				allowNull: false,
				type: DataTypes.STRING(255),
				unique: true,
				validate: {
					len: {
						args: [0, 255],
						msg: 'Địa chỉ mac có độ dài tối đa 255 ký tự',
					},
					notNull: 'Địa chỉ mac không được bỏ trống',
				},
			},
			avatar: {
				type: DataTypes.STRING(255),
			},
			is_active: {
				type: DataTypes.TINYINT,
				defaultValue: 1,
				validate: {
					isIn: {
						args: [[1, 0]],
						msg: 'Trạng thái là 1: hoạt động , 0 : ngừng hoạt động ',
					},
				},
			},
			location_id: {
				type: DataTypes.INTEGER,
			},
			step_time: {
				type: DataTypes.INTEGER,
				defaultValue: 300,
				validate: {
					min: {
						args: 0,
						msg: 'Khoảng cách giữa các lần gửi tin phải lớn hơn 0',
					},
				},
			},
			device_type: {
				type: DataTypes.INTEGER,
				defaultValue: 1,
			},
			created_id: {
				type: DataTypes.INTEGER,
			},
			updated_id: {
				type: DataTypes.INTEGER,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			sequelize,
			modelName: 'SensorDevice',
			tableName: 'sensor_device',
		},
	);
	return SensorDevice;
};
