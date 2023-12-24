const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const Taches = require("./Tache");

class ListeTaches extends Model {}

ListeTaches.init(
  {
    nom_liste: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_tache: {
      type: DataTypes.INTEGER,
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
    modelName: "ListeTaches", 
  }
);

ListeTaches.belongsTo(Taches, { foreignKey: 'id_tache' }); 

module.exports = ListeTaches;
