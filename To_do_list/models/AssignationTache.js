const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const User = require("./User"); 
const Tache = require("./Tache"); 

class AssignationTache extends Model {}

AssignationTache.init(
  {
    id_tache: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "AssignationTache",
  }
);
// Accès à l'utilisation associé à une tâche 
AssignationTache.belongsTo(User, { foreignKey: 'id_user' }); 

AssignationTache.belongsTo(Tache, { foreignKey: 'id_tache' });

// Accès à toutes les tâches d'un utilisateur
User.hasMany(AssignationTache, { foreignKey: 'id_user' });

module.exports = AssignationTache;