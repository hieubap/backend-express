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
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.testConnect = async () => {
    try {
        await db.sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
db.sync = () => sequelize.sync({ alter: true }) // this will create if not exist model in db
db.drop = () => sequelize.drop() // drop all model in db

db.User = require('./user.model')(sequelize);
db.Address = require('./address.model')(sequelize);

module.exports = db

// default mỗi model sẽ có trường các trường mặc định là id , createdAt , updatedAt , các trường mặc định là allowNull = true , defaultValue = null
