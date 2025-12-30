const { DataTypes } = require('sequelize');

// Pegamos a credencial de conexão com o banco de dados
const conexaoDB = require("../config/database.js");

const Task = conexaoDB.define(
    'Task', {
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
    }
});

module.exports = Task;