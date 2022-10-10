const { DataTypes } = require("sequelize");
const sequelize = require("../Config/database");

const TourOne = sequelize.define(
  "TourOne",
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
    arthaud_nathalie: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    roussel_fabian: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    macron_emmanuel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lassalle_jean: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    le_pen_marine: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    zemmour_eric: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    melenchon_jean_luc: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hidalgo_anne: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    jadot_yannick: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pecresse_valerie: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    poutou_philippe: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dupont_aignan_nicolas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "TourOne", // We need to choose the model name
    freezeTableName: true,
  }
);


module.exports = TourOne;
