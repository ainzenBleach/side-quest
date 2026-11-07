// *** Cria as interações que vamos ter com a(s) tabela(s) ***

// Conexão com a tabela task | Sempre usar quando for interagir com a tabela
const Task = require("../models/tabelaTask")

const taskController = {
    create: async(req, res) => {
        try{
            const { title, description,points} = req.body

            if(!title) return res.status(400).json({ error: "Titulo obrigatorio"})

            const newTask = await Task.create({
                title,
                description,
                status: false,
                points
            })

            return res.status(201).json(newTask);
        }
        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    getall: async(req, res) => {
        try{
            const tasks = await Task.findAll();

            return res.status(200).json(tasks);
        }
        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    delete: async(req, res) =>{
        try{
            const { id } = req.params;
            const tasks = await Task.destroy({
                  where: {
                    id: id,
                  },
                });
            return res.status(200).json(tasks);
        }

        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    update: async(req, res) => {

        try{

            const { id } = req.params;
            
            const { title, status } = req.body;
            
            const tasks = await Task.update(
                { title, status },
                {
                    where: {
                        id: id,
                    },
                },
            );
            
            return res.status(200).json(tasks);
        }

        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    updateState: async(req, res) => {

        try{

            const { id } = req.params;
            
            const { status } = req.body;
            
            const tasks = await Task.update(
                { status },
                {
                    where: {
                        id: id,
                    },
                },
            );
            
            return res.status(200).json(tasks);
        }

        catch(error){
            return res.status(400).json({ error: error.message })
        }
    }
}

module.exports = taskController
































