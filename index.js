const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config()
const cors = require('cors')

const PORT = process.env.PORT || 7000;

//crear el servidor de express


const app = express();
//BASE DE DATOS
dbConnection()

//CORS
app.use(cors())

//hey
//dir publico
app.use(express.static('Public'))


//lectura y parse del body
app.use(express.json())

//Rutas
//TODO: auth// crear login 
app.use('/api/auth', require('./Routes/auth'));

//TODO:CRUD: Eventos
app.use('/api/events', require('./Routes/events'))




//excuchar peticiones
app.listen(PORT,()=>{
    console.log(`servidor en ${PORT}`)
} );