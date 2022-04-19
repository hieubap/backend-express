require('dotenv').config({ path: '.env' });

module.exports = {
  HOST: process.env.MYSQL_HOST,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DB,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
};