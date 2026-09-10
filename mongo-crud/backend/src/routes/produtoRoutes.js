const express = require('express');
const router = express.Router();

const {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  excluirProduto,
} = require('../controllers/produtoController');

router.get('/', listarProdutos);
router.get('/:id', buscarProduto);
router.post('/', criarProduto);
router.put('/:id', atualizarProduto);
router.delete('/:id', excluirProduto);

module.exports = router;