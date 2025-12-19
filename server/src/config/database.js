// src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Criando a instância do Sequelize
// Lembre-se: A porta aqui deve ser a do DOCKER EXTERNA (3307)
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Nome do banco
    process.env.DB_USER,     // Usuário
    process.env.DB_PASS,     // Senha
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
    }
);

module.exports = sequelize;