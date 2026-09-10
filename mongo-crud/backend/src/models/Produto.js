const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome do produto é obrigatório'],
      trim: true,
    },
    descricao: {
      type: String,
      trim: true,
      default: '',
    },
    preco: {
      type: Number,
      required: [true, 'O preço do produto é obrigatório'],
      min: [0, 'O preço não pode ser negativo'],
      default: 0,
    },
    quantidade: {
      type: Number,
      required: [true, 'A quantidade em estoque é obrigatória'],
      min: [0, 'A quantidade não pode ser negativa'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Produto', produtoSchema);