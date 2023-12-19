import express from "express";
import { config } from "dotenv";
import pg from 'pg'
const cors = require('cors');

const app = express();

// Configuración para permitir cualquier origen (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite cualquier origen
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Encabezados permitidos
    next();
});

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})
app.get('/', (req, res) => {
    res.send("Aun sirve el despliegue")
})
app.get('/ping', async (req, res) => {
    const response = await pool.query('SELECT NOW()')
    return res.json(response.rows[0])
})

app.get('/crear_deseos', async (req, res) => {
    return res.json("Ruta para crear deseos");
})

app.get('/eliminar_deseos', async (req, res) => {
    return res.json("Ruta para eliminar deseos");
})
app.get('/registra_usuarios', async (req, res) => {
    return res.json("Ruta registrar usuarios");
})
app.get('/iniciar_sesion', async (req, res) => {
    return res.json("login");
})

app.listen(5000)
console.log("servidor en:" + 5000);