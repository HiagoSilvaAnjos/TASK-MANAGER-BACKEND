const express = require('express');

const TaskController = require('../controllers/task.controler');
const TaskModel = require('../models/task.model');

const router = express.Router();

// Lendo as Tarefas
router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
})

// Lendo as informações da Tarefa 
router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
})

// Criando as Tarefas
router.post('/', async (req, res) => {
    return new TaskController(req, res).create();
})

// Atualizando uma Tarefa
router.patch('/:id', async (req, res) => {
    return new TaskController(req, res).update();
})

// Deletando uma tarefa
router.delete('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        // Verificando se a Tarefa Existe
        const taskToDelete = await TaskModel.findById(taskId);

        if (!taskToDelete) {
            res.status(404).send("Essa tarefa não foi encontrada.");
        }

        // Deletando uma tarefa
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;