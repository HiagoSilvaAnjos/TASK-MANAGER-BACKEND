// CRIANDO O MODEL
const { Schema, model } = require('mongoose');

const TaskSchema = Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
})

// Criando o Model
const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;