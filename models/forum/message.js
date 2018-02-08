// Initialisation du module dans le projet
var mongoose = require("mongoose");

// Défini les types des données d'un enregistrement
var messageSchema = new mongoose.Schema({
  chatId: String,
  postedBy: String,
  messageContent: String
});

// Création d'un modèle, Lier le schéma au modèle
mongoose.model("messages", messageSchema);
