# CRUD de Produtos

Projeto de um sistema CRUD (Create, Read, Update e Delete) para gerenciamento de produtos, desenvolvido com Node.js, MongoDB e JavaScript.

A aplicação permite cadastrar, visualizar, editar e excluir produtos, além de mostrar informações como preço, descrição e quantidade disponível em estoque.

<img width="1920" height="921" alt="image" src="https://github.com/user-attachments/assets/e955cb97-4a2e-4116-bb0d-a3d2fdb63297" />



## Funcionalidades

* Cadastro de produtos
* Listagem dos produtos cadastrados
* Consulta de um produto por ID
* Edição de produtos
* Exclusão de produtos
* Atualização da lista de produtos
* Controle de quantidade em estoque
* Formatação dos preços em Real (R$)
* Validação dos dados do formulário
* Tratamento de erros da API

## Tecnologias utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express
* MongoDB
* Mongo

## Estrutura do projeto

```text
CRUD-MongoDB/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── ...
│
├── .env
└── README.md
```

## Dados dos produtos

Cada produto possui os seguintes campos:

| Campo      | Tipo   | Descrição                        |
| ---------- | ------ | -------------------------------- |
| nome       | String | Nome do produto                  |
| descricao  | String | Descrição do produto             |
| preco      | Number | Preço do produto                 |
| quantidade | Number | Quantidade disponível em estoque |

## API

A aplicação utiliza a rota:

```text
/api/produtos
```

### Principais operações

**GET**

Retorna todos os produtos cadastrados.

```text
GET /api/produtos
```

**GET por ID**

Busca um produto específico.

```text
GET /api/produtos/:id
```

**POST**

Cadastra um novo produto.

```text
POST /api/produtos
```

**PUT**

Atualiza um produto existente.

```text
PUT /api/produtos/:id
```

**DELETE**

Exclui um produto.

```text
DELETE /api/produtos/:id
```

## Como executar o projeto

### 1. Instale as dependências

Dentro da pasta do backend:

```bash
npm install
```

### 2. Configure o MongoDB

Crie um arquivo `.env` na raiz do backend e adicione a variável de conexão com o MongoDB:

```env
MONGODB_URI=sua_string_de_conexao
PORT=3000
```

### 3. Inicie o servidor

```bash
npm start
```

Ou, caso o projeto utilize o modo de desenvolvimento:

```bash
npm run dev
```

### 4. Acesse a aplicação

Depois de iniciar o servidor, abra no navegador:

```text
http://localhost:3000 ou http://localhost:8000 
```

## Funcionamento

Na tela inicial, o usuário pode preencher os dados do produto e clicar em **Salvar produto**.

Os produtos cadastrados aparecem automaticamente na seção de produtos.

Cada produto possui as opções:

* **Editar:** carrega os dados do produto no formulário para alteração.
* **Excluir:** remove o produto após uma confirmação.
* **Atualizar:** busca novamente os produtos cadastrados no banco de dados.

O formulário também é utilizado para edição. Quando um produto é selecionado, o título muda para **Editar produto** e o botão passa de **Salvar produto** para **Atualizar produto**.

## Objetivo

O projeto foi desenvolvido com o objetivo de praticar a criação de uma aplicação web integrada a um banco de dados MongoDB, trabalhando conceitos de API REST, operações CRUD, comunicação entre frontend e backend e manipulação de dados.

## Autora

**Wendy Mininel**

Projeto acadêmico desenvolvido para prática de desenvolvimento web.
