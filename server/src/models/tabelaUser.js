
// *** Criacação e manipulação da tabela ***

const { DataTypes } = require('sequelize');

// Pegamos a credencial de conexão com o banco de dados
const conexaoDB = require("../config/database.js");

const User = conexaoDB.define(
    "user",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,       
            autoIncrement: true,
            allowNull: false,       
        },
    
        name: {
            type: DataTypes.STRING,
            allowNull: false,       
        },

        spent_points: {
            type: DataTypes.INTEGER,
            defaultValue:0
        }
    }
)

module.exports = user;