// Importando as bibliotecas
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Inicializando o app
const app = express();

// Configurações básicas
app.use(cors()); // Libera acesso externo
app.use(express.json()); // Permite que o servidor entenda JSON (dados que virão do React)

// Uma rota de teste
app.get('/', (req, res) => {
    res.send('Servidor rodando com sucesso! 🚀');
});

// Definindo a porta
const PORT = process.env.PORT || 3001;

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Importar a conexão que acabamos de criar
const db = require('./config/database');

// Testar a conexão
db.authenticate()
    .then(() => {
        console.log('Conectou ao banco de dados com sucesso! 🐘');
    })
    .catch(err => {
        console.error('Erro ao conectar no banco:', err);
    });