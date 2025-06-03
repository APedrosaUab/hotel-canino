const mongoose = require('mongoose');

const ConteudoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  tipo: { type: String, required: true },
  corpo: { type: String, required: true },
  atualizadoEm: { type: Date, default: Date.now }
}, { timestamps: true });


module.exports = mongoose.model('Conteudo', ConteudoSchema);
