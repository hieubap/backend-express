const { DataTypes, Model } = require('sequelize')
// const user = require('./user.model')

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
                type : DataTypes.INTEGER,
                validate : {
                    isInt : {
                        msg : 'location phai co dang integer'
                    }
                }
            }
        },
        {
            sequelize,
            modelName: 'address',
            tableName: 'Address',
        }
    )
    return Address
}
