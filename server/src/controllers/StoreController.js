// *** Cria as interações que vamos ter com a(s) tabela(s) ***

// Conexão com a tabela Store | Sempre usar quando for interagir com a tabela
const Store = require("../models/tabelaStore")

const StoreController = {
    createProduct: async(req, res) => {
        try{
            const { title, description,cost_points} = req.body

            if(!title) return res.status(400).json({ error: "Titulo obrigatorio"})

            const newProduct = await Store.create({
                title,
                description,
                status: false,
                cost_points
            })

            return res.status(201).json(newProduct);
        }
        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    getAllProduct: async(req, res) => {
        try{
            const Products = await Store.findAll();

            return res.status(200).json(Products);
        }
        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    deleteProduct: async(req, res) =>{
        try{
            const { id } = req.params;
            const product = await Store.destroy({
                  where: {
                    id: id,
                  },
                });
            return res.status(200).json(product);
        }

        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    updateProduct: async(req, res) => {

        try{

            const { id } = req.params;
            
            const { title, status } = req.body;
            
            const Stores = await Store.update(
                { title, status },
                {
                    where: {
                        id: id,
                    },
                },
            );
            
            return res.status(200).json(Stores);
        }

        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    updateStateProduct: async(req, res) => {

        try{

            const { id } = req.params;
            
            const { status } = req.body;
            
            const Stores = await Store.update(
                { status },
                {
                    where: {
                        id: id,
                    },
                },
            );
            
            return res.status(200).json(Stores);
        }

        catch(error){
            return res.status(400).json({ error: error.message })
        }
    }

}

module.exports = StoreController
































