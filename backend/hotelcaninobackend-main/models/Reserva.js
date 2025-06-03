const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
  id_utilizador: { type: mongoose.Schema.Types.ObjectId, ref: "Utilizador", required: true },
  id_cao: { type: mongoose.Schema.Types.ObjectId, ref: "Cao", required: true },
  data_inicio: { type: Date, required: true },
  data_fim: { type: Date, required: true },
  observacoes: { type: String }
});

module.exports = mongoose.model("Reserva", ReservaSchema);
