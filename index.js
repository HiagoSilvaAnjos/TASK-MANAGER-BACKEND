const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const TaskRouter = require('./src/routes/task.routes');

const connectToDataBase = require('./src/database/mongoose.database');

// inicializando o express (esse "app" basicamente  possui tudo o que o servidor pode fazer)
dotenv.config();
const app = express();
app.use(cors());

// Falando para o express que vamos receber JSON na body das requisições
app.use(express.json());

connectToDataBase();

app.use('/tasks', TaskRouter);

const port = 8000;
// Servidor local
app.listen(port, () => console.log(`Listening on port: localhost:${port}`))