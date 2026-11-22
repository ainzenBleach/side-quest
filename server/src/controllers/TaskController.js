// *** Cria as interações que vamos ter com a(s) tabela(s) ***

// Conexão com a tabela task | Sempre usar quando for interagir com a tabela
const { Op, where, fn, col } = require("sequelize")
const Task = require("../models/tabelaTask")

const taskController = {
    createTask: async(req, res) => {
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

    getallTask: async(req, res) => {
        try{
            const tasks = await Task.findAll({ order: [['createdAt', 'DESC']] });

            return res.status(200).json(tasks);
        }
        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },
    getTaskById: async(req, res) => {
        try{

            const {id} = req.params

            const tasks = await Task.findByPk(id);

            return res.status(200).json(tasks);
        }
        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    getallPoints: async (req, res) => {
        try{
            //select sum(points) as "pontos" from tasks where status = 1;
            const points = await Task.sum(
                'points',
                {where:{
                    status: 1
                }}
            );

            return res.status(200).json({points:points});
        }
        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    getTaskMonth: async (req, res) => {
        try{
            const month = Number(req.params.month);
            const year = Number(req.params.year);

            if (!Number.isInteger(month) || month < 1 || month > 12 ||
                !Number.isInteger(year) || year < 1) {
                return res.status(400).json({ error: "Mês ou ano inválido." });
            }

            const tasks = await Task.findAll({
                where: {
                    [Op.and]: [
                        where(fn("MONTH", col("createdAt")), month),
                        where(fn("YEAR", col("createdAt")), year)
                    ]
                },
                order: [['createdAt', 'DESC']]
            });

            return res.status(200).json(tasks);
        }
        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    getTaskMonthAmount: async (req, res) => {
        try{
            const tasks = await Task.findAll({
                attributes: [
                    [fn("YEAR", col("createdAt")), "ano"],
                    [fn("MONTH", col("createdAt")), "mes"],
                    [fn("COUNT", col("id")), "total_itens"]
                ],
                group: [
                    fn("YEAR", col("createdAt")),
                    fn("MONTH", col("createdAt"))
                ],
                order: [
                    [fn("YEAR", col("createdAt")), "ASC"],
                    [fn("MONTH", col("createdAt")), "ASC"]
                ],
                raw: true
            });

            return res.status(200).json(tasks);
        }
        catch(error){
            return res.status(400).json({ error: error.message })
        }
    },

    deleteTask: async(req, res) =>{
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

    updateTask: async(req, res) => {

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

    updateStateTask: async(req, res) => {

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