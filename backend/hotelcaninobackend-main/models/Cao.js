const mongoose = require('mongoose');

const CaoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  raca: { type: String, required: true },
  idade: { type: Number, required: true },
  id_utilizador: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilizador', required: true }
});

module.exports = mongoose.model('Cao', CaoSchema);
