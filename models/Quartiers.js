const { DataTypes } = require("sequelize");
const sequelize = require("../Config/database");

const Quartiers = sequelize.define(
  "Quartiers",
  {
    // Model attributes are defined here
    c_qu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_ar: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    l_qu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Quartiers", // We need to choose the model name
    freezeTableName: true,
  }
);

module.exports = Quartiers;
