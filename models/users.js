// Initialisation du module dans le projet
var mongoose = require("mongoose");

// Défini les types des données d'un enregistrement
var userSchema = mongoose.Schema({
  email: String,
  password: String
});

// Création d'un modèle, Lier le schéma au modèle
mongoose.model("users", userSchema);
