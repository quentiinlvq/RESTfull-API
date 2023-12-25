const connection = require("./models/db");
require("./models/User");
require("./models/AssignationTache");
require("./models/Commentaire");
require("./models/ListeTaches");
require("./models/Tache");

connection.sync({alter: true}).then(() => console.log("Database synchronized"));