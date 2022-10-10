const { DataTypes } = require("sequelize");
const sequelize = require("../Config/database");

const TourTwo = sequelize.define(
  "TourTwo",
  {
    // Model attributes are defined here
    annee: {
      type: DataTypes.INTEGER,
    },
    tour: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    num_circ: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    num_quartier: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    num_arrond: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    num_sec: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    num_bureau: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nb_inscrit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nb_emargement: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nb_votant: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nb_vote_blanc: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nb_vote_null: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nb_exprime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    macron_emmanuel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    le_pen_marine: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "TourTwo", // We need to choose the model name
    freezeTableName: true,
  }
);


module.exports = TourTwo;
