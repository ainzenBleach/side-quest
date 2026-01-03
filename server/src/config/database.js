// *** Credencias de acesso ao banco ***

//Criação das credenciais de conexão com o banco de dados | Sempre chamar quando pedir acesso ao servidor 

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Criando a instância do Sequelize
// As informações é pegas do arquivo .env

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,     
    {
        host: process.env.DB_HOST,
        dialect:'mysql',
        port:process.env.DB_PORT
    } 
);


module.exports = sequelize;