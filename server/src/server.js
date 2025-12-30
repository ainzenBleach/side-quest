// Definindo a porta
const PORT = process.env.PORT || 3001;

// Importando as bibliotecas
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes.js');
require('dotenv').config();

// Inicializando o app
const app = express();

app.use(cors()); // Libera acesso externo
app.use(express.json()); // Permite que o servidor entenda JSON (dados que virão do React)

//Rota teste
app.get('/', (req, res) => {
    res.send('Servidor rodando com sucesso! 🚀');
});

app.use("/api", routes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


// *** Conexão com o banco de dados ***
// Importar a conexão do banco de dados (database.js)
const db = require('./config/database');
const task = require("./models/tabelaTask.js")
// Testar a conexão
db.authenticate()
    .then(() => {
        console.log('Conectou ao banco de dados com sucesso! 🐘');
    })
    .catch(err => {
        console.error('Erro ao conectar no banco:', err);
    });

db.sync({force:false})
.then(() => {
        console.log('Banco de dados sincronizado! Tabela Tasks pronta. ✅');
    })
    .catch((err) => {
        console.error('Erro ao sincronizar banco:', err);
    });