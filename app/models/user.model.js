const { DataTypes, Model } = require('sequelize')

module.exports = (sequelize) => {
    class User extends Model {}
    User.init(
        {
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            firstName: {
                type: DataTypes.STRING,
            },
            lastName: {
                type: DataTypes.STRING,
            },
            gender: {
                type: DataTypes.ENUM({
                    values: ['male', 'female'],
                }),
            },
            phone: {
                type: DataTypes.STRING,
            },
        },
        { sequelize, modelName: 'user' , tableName:'User' }
    )
}
