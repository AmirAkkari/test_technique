const { Sequelize, DataTypes, Model } = require('sequelize');
const DB_URI = process.env.DB_URI;

const Seq =  new Sequelize(DB_URI, {
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});



module.exports = Seq;