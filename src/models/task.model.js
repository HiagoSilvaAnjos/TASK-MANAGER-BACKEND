// CRIANDO O MODEL
import { Schema, Model } from 'mongoose';

const TaskSchema = Schema({
    description: {
        type: String,
        // seta se o campo é obrigatório => requered
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
})

// Criando o Model
const TaskModel = Model("Task", TaskSchema);

export default TaskModel;