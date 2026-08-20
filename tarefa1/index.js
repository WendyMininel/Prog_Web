const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/cadastro', (req, res) => {
    const { nome, endereco, telefone } = req.body;
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Dados informados</title>
        </head>
        <body>

            <h1>Dados informados</h1>
            <p><strong>Nome: </strong> ${nome}</p>
            <p><strong>Endereço: </strong> ${endereco}</p>
            <p><strong>Telefone: </strong> ${telefone}</p>

        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});