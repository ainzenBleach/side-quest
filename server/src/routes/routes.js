// Central das rostas que criamos,

const express = require("express");
const routes = express.Router();
const taskController = require("../controllers/TaskController");
const storeController = require("../controllers/StoreController");

//Tasks
routes.post("/tasks", taskController.createTask);
routes.get("/tasks", taskController.getallTask)
routes.put("/tasks/:id", taskController.updateTask)
routes.put("/tasks/state/:id", taskController.updateStateTask)
routes.delete("/tasks/:id", taskController.deleteTask)

//Store
routes.post("/store", storeController.createProduct);
routes.get("/store", storeController.getAllProduct)
routes.put("/store/:id", storeController.updateProduct)
routes.put("/store/state/:id", storeController.updateStateProduct)
routes.delete("/store/:id", storeController.deleteProduct)

module.exports = routes;