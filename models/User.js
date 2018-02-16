// Initialisation du module dans le projet
var mongoose = require("mongoose");

// Défini les types des données d'un enregistrement
var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  lastName: String,
  firstName: String,
  email: String,
  batchNumber: Number,
  batchLocation: String,
  statusType: String,
  myDescription: String,
  wantedJob: String,
  wanttoDo: String,
  notwanttoDo: String,
  html_level: Number,
  css_level: Number,
  bootstrap_level: Number,
  javascript_level: Number,
  react_level: Number,
  node_level: Number,
});

// Création d'un modèle, Lier le schéma au modèle
mongoose.model("users", userSchema);
mongoose.model("approvedUsers", userSchema);
