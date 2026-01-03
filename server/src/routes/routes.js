// Central das rostas que criamos,

const express = require("express");
const routes = express.Router();
const taskController = require("../controllers/TaskController");

routes.post("/tasks", taskController.create);
routes.get("/tasks", taskController.getall)
routes.put("/tasks/:id", taskController.update)
routes.delete("/tasks/:id", taskController.delete)

module.exports = routes;