//importacion y establecimiento de conexion con Mongodb
const express = require("express");
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

//const mongoose = require("mongoose");

const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use( express.static('public'));

// Lectura y parseo del body
app.use( express.json() )

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/usuarios', require('./routes/auth'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})


 