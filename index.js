const express = require('express');
const dotenv = require('dotenv');

const connectToDataBase = require('./src/database/mongoose.database')
dotenv.config();

connectToDataBase();

// inicializando o express (esse "app" basicamente  possui tudo o que o servidor pode fazer)
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
})

app.listen(8000, () => console.log("Listening on port 8000"));

