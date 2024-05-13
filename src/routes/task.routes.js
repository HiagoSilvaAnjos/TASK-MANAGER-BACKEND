const express = require('express');

const TaskController = require('../controllers/task.controler');

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
    return new TaskController(req, res).delete();
})

module.exports = router;