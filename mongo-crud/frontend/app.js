const API_URL = '/api/produtos';

const form = document.getElementById('product-form');
const formTitle = document.getElementById('form-title');
const productIdInput = document.getElementById('product-id');
const nomeInput = document.getElementById('nome');
const descricaoInput = document.getElementById('descricao');
const precoInput = document.getElementById('preco');
const quantidadeInput = document.getElementById('quantidade');
const submitBtn = document.getElementById('submit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const refreshBtn = document.getElementById('refresh-btn');
const productsGrid = document.getElementById('products-grid');
const productCount = document.getElementById('product-count');
const emptyState = document.getElementById('empty-state');

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function limparFormulario() {
  form.reset();
  productIdInput.value = '';
  formTitle.textContent = 'Cadastrar produto';
  submitBtn.textContent = 'Salvar produto';
  cancelEditBtn.hidden = true;
}

function escapeHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function renderizarProdutos(produtos) {
  productsGrid.innerHTML = '';
  productCount.textContent = `${produtos.length} produto(s) cadastrado(s)`;
  emptyState.hidden = produtos.length > 0;

  produtos.forEach((produto) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${escapeHtml(produto.nome)}</h3>
      <p class="descricao">${escapeHtml(produto.descricao || '')}</p>
      <div class="product-meta">
        <span class="preco">${formatarPreco(produto.preco)}</span>
        <span class="estoque">Estoque: ${produto.quantidade}</span>
      </div>
      <div class="product-actions">
        <button class="btn btn-edit" data-action="editar" data-id="${produto._id}">Editar</button>
        <button class="btn btn-delete" data-action="excluir" data-id="${produto._id}">Excluir</button>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// Lê o corpo da resposta com segurança e monta uma mensagem de erro útil
async function extrairMensagemErro(resposta, mensagemPadrao) {
  try {
    const corpo = await resposta.json();
    return corpo.detalhe || corpo.erro || mensagemPadrao;
  } catch {
    return `${mensagemPadrao} (status ${resposta.status})`;
  }
}

async function carregarProdutos() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) {
      const msg = await extrairMensagemErro(resposta, 'Falha ao buscar produtos');
      throw new Error(msg);
    }
    const produtos = await resposta.json();
    renderizarProdutos(produtos);
  } catch (erro) {
    console.error(erro);
    productCount.textContent = '0 produto(s) cadastrado(s)';
    emptyState.hidden = false;
    emptyState.textContent = `Erro ao carregar produtos: ${erro.message}`;
  }
}

async function salvarProduto(dados, id) {
  const url = id ? `${API_URL}/${id}` : API_URL;
  const metodo = id ? 'PUT' : 'POST';

  const resposta = await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const msg = await extrairMensagemErro(resposta, 'Erro ao salvar produto');
    throw new Error(msg);
  }

  return resposta.json();
}

async function buscarProdutoPorId(id) {
  const resposta = await fetch(`${API_URL}/${id}`);
  if (!resposta.ok) {
    const msg = await extrairMensagemErro(resposta, 'Produto não encontrado');
    throw new Error(msg);
  }
  return resposta.json();
}

async function excluirProduto(id) {
  const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!resposta.ok) {
    const msg = await extrairMensagemErro(resposta, 'Erro ao excluir produto');
    throw new Error(msg);
  }
  return resposta.json();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const dados = {
    nome: nomeInput.value.trim(),
    descricao: descricaoInput.value.trim(),
    preco: parseFloat(precoInput.value) || 0,
    quantidade: parseInt(quantidadeInput.value, 10) || 0,
  };

  const id = productIdInput.value || null;

  try {
    submitBtn.disabled = true;
    await salvarProduto(dados, id);
    limparFormulario();
    await carregarProdutos();
  } catch (erro) {
    console.error(erro);
    alert(erro.message);
  } finally {
    submitBtn.disabled = false;
  }
});

cancelEditBtn.addEventListener('click', () => {
  limparFormulario();
});

refreshBtn.addEventListener('click', () => {
  carregarProdutos();
});

productsGrid.addEventListener('click', async (event) => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;

  const { action, id } = btn.dataset;

  if (action === 'excluir') {
    const confirmar = confirm('Tem certeza que deseja excluir este produto?');
    if (!confirmar) return;

    try {
      await excluirProduto(id);
      await carregarProdutos();
    } catch (erro) {
      console.error(erro);
      alert(erro.message);
    }
  }

  if (action === 'editar') {
    try {
      const produto = await buscarProdutoPorId(id);

      productIdInput.value = produto._id;
      nomeInput.value = produto.nome;
      descricaoInput.value = produto.descricao || '';
      precoInput.value = produto.preco;
      quantidadeInput.value = produto.quantidade;

      formTitle.textContent = 'Editar produto';
      submitBtn.textContent = 'Atualizar produto';
      cancelEditBtn.hidden = false;

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (erro) {
      console.error(erro);
      alert(erro.message);
    }
  }
});

carregarProdutos();