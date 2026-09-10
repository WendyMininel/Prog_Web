const Produto = require('../models/Produto');

// GET /api/produtos -> lista todos os produtos
async function listarProdutos(req, res) {
  try {
    const produtos = await Produto.find().sort({ createdAt: -1 });
    res.json(produtos);
  } catch (erro) {
    console.error('Erro ao listar produtos:', erro);
    res.status(500).json({ erro: 'Erro ao buscar produtos', detalhe: erro.message });
  }
}

// GET /api/produtos/:id -> busca um produto específico
async function buscarProduto(req, res) {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (erro) {
    console.error('Erro ao buscar produto:', erro);
    res.status(400).json({ erro: 'ID inválido', detalhe: erro.message });
  }
}

// POST /api/produtos -> cria um novo produto
async function criarProduto(req, res) {
  try {
    const { nome, descricao, preco, quantidade } = req.body;

    const novoProduto = new Produto({
      nome,
      descricao,
      preco,
      quantidade,
    });

    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (erro) {
    console.error('Erro ao criar produto:', erro);
    res.status(400).json({ erro: 'Erro ao criar produto', detalhe: erro.message });
  }
}

// PUT /api/produtos/:id -> atualiza um produto existente
async function atualizarProduto(req, res) {
  try {
    const { nome, descricao, preco, quantidade } = req.body;

    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      { nome, descricao, preco, quantidade },
      { new: true, runValidators: true }
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json(produtoAtualizado);
  } catch (erro) {
    console.error('Erro ao atualizar produto:', erro);
    res.status(400).json({ erro: 'Erro ao atualizar produto', detalhe: erro.message });
  }
}

// DELETE /api/produtos/:id -> remove um produto
async function excluirProduto(req, res) {
  try {
    const produtoRemovido = await Produto.findByIdAndDelete(req.params.id);

    if (!produtoRemovido) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json({ mensagem: 'Produto removido com sucesso', produto: produtoRemovido });
  } catch (erro) {
    console.error('Erro ao excluir produto:', erro);
    res.status(400).json({ erro: 'Erro ao excluir produto', detalhe: erro.message });
  }
}

module.exports = {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  excluirProduto,
};