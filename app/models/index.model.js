const config = require('../config/db.config.js')
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    logging: false,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
})
const db = {
    Sequelize : Sequelize,
    sequelize : sequelize,
    User : require('./user.model')(sequelize),
    Address : require('./address.model')(sequelize),
    testConnect : async () => {
        try {
            await db.sequelize.authenticate()
            console.log('Connection has been established successfully.')
        } catch (error) {
            console.error('Unable to connect to the database:', error)
        }
    },
    sync : () => sequelize.sync({ alter: true }) // this will create if not exist model in db
}

// define association between all model
const {User , Address} = db
User.hasMany(Address , { onDelete : 'RESTRICT' , onUpdate : 'RESTRICT'})

module.exports = db

