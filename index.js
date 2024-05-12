const express = require('express');
const dotenv = require('dotenv');

const connectToDataBase = require('./src/database/mongoose.database');
const TaskModel = require('./src/models/task.model');

// inicializando o express (esse "app" basicamente  possui tudo o que o servidor pode fazer)
dotenv.config();
const app = express();

// Falando para o express que vamos receber JSON na body das requisições
app.use(express.json());

const port = 8000;

connectToDataBase();

// Lendo as Tarefas
app.get("/tasks", async (req, res) => {
    try {
        const task = await TaskModel.find({});
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    };
})

// Lendo as informações da Tarefa 
app.get("/tasks/:id", async (req, res) => {
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
app.post('/tasks', async (req, res) => {
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
app.patch('/tasks/:id', async (req, res) => {
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
app.delete('/tasks/:id', async (req, res) => {
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

// Servidor local
app.listen(port, () => console.log(`Listening on port: localhost:${port}`))