const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const User = require("./User"); 
const Taches = require("./Tache"); 

class Commentaire extends Model {}

Commentaire.init(
  {
    id_commentaire: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_tache: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_commentaire: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: connection,
    modelName: "Commentaire", // Nom du modèle
  }
);

Commentaire.belongsTo(User, { foreignKey: 'id_user' }); 
Commentaire.belongsTo(Taches, { foreignKey: 'id_tache' }); 

module.exports = Commentaire;
