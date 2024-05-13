const TaskModel = require('../models/task.model');

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTask() {
        try {
            const task = await TaskModel.find({});
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        };
    }

    async getTaskById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                return this.res.status(404).send("Essa tarefa não foi encotrada");
            }

            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        };
    }
}

module.exports = TaskController;