const express = require('express');

const TaskController = require('../controllers/task.controler');
const TaskModel = require('../models/task.model');

const router = express.Router();

// Lendo as Tarefas
router.get("/", async (req, res) => {
    return new TaskController(req, res).getTask();
})

// Lendo as informações da Tarefa 
router.get("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if (!task) {
            res.status(404).send("Essa tarefa não foi encotrada");
        }

        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    };
})

// Criando as Tarefas
router.post('/', async (req, res) => {
    try {
        // Adicionando a Tarefa
        const newTask = TaskModel(req.body);

        // Salvando a Tarefa
        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// Atualizando uma Tarefa
router.patch('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await TaskModel.findById(taskId);

        const allowedUpdates = ["isCompleted"];
        const requestUpdates = Object.keys(taskData)

        for (let update of requestUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res.status(500).send("Um ou mais campos inseridos não são editaveis.")
            }
        }

        await taskToUpdate.save();
        return res.status(200).send(taskToUpdate);
    } catch (error) {
        res.status(500).send(error.message);
    }
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