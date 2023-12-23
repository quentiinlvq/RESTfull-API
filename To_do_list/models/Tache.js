const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Tache extends Model {}

Tache.init(
  {
    id_tache: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nom_tache: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: connection,
    modelName: "Tache", 
  }
);

module.exports = Tache;
