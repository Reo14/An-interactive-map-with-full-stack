const express = require('express');
const cors = require("cors");

//dotenv
require('dotenv').config();

const { connection } = require('./database/dbConect')

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

//* CONEXION A BBDD
connection()

//* Para parsear // traducir
app.use(express.json());

//* Para parsear req con urlencoded payload
app.use(express.urlencoded({ extended: false }));

//* RUTAS

app.use('/api/v1/entries', require('./routers/routersDatabase'));

app.use('/api/v1/users', require('./routers/routersUsers'));

app.use('/api/v1/auth', require('./routers/routersAuth'));

//* Listener
app.listen(port, () => {
    console.log(`connected from port ${port}`)
})