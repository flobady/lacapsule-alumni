// Initialisation du module dans le projet
var mongoose = require("mongoose");

// Défini les types des données d'un enregistrement
var chatSchema = new mongoose.Schema({
  postedBy: String,
  topicName: String,
  description: String
});

// Création d'un modèle, Lier le schéma au modèle
mongoose.model("chats", chatSchema);
