const mongoose = require('mongoose');

const connectToDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagercluster.tfffvao.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=TaskManagerCluster`,
    ).then(() => console.log("Connected to MongoDB server"))
}

module.exports = connectToDatabase;