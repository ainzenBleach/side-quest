// *** Criacação e manipulação da tabela ***

const { DataTypes } = require('sequelize');

// Pegamos a credencial de conexão com o banco de dados
const conexaoDB = require("../config/database.js");

const Product = conexaoDB.define(
    'Product',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,       
            autoIncrement: true,
            allowNull: false,       
        },
    
        title: {
            type: DataTypes.STRING,
            allowNull: false,       
        },
    
        description: {
            type: DataTypes.TEXT,   
            allowNull: true,        
        },
    
        status: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false,     
        },
        cost_points: {
            type: DataTypes.INTEGER,
            defaultValue:10
        }
    }
)

module.exports = Product;