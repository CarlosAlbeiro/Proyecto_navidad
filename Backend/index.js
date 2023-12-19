import express from "express";
import { config } from "dotenv";
import mysql from 'mysql2/promise';

config();

const app = express();

// Crear un pool de conexiones para MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Configuración para permitir cualquier origen (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite cualquier origen
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Encabezados permitidos
    next();
});

app.get('/users', async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM Users');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/login', async (req, res) => {
    try {
        // Obtén los parámetros de la URL
        const { usuario, password } = req.query;

        // Verifica que todos los parámetros necesarios estén presentes
        if (!usuario || !password) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }

        // Realiza la inserción en la base de datos
        const [result] = await pool.query('SELECT * FROM Users WHERE name=? AND password=?', [usuario, password]);

        // Devuelve el resultado de la inserción
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.get('/', (req, res) => {
    res.send("Aun sirve el despliegue")
})

app.get('/ping', async (req, res) => {
    const [rows, fields] = await pool.query('SELECT NOW()');
    return res.json(rows[0]);
});

app.get('/crear_deseos', async (req, res) => {
    try {
        // Obtén los parámetros de la URL
        const { id_usuario, nombre, link } = req.query;

        // Verifica que todos los parámetros necesarios estén presentes
        if (!id_usuario || !nombre || !link) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }

        // Realiza la inserción en la base de datos
        const [result] = await pool.query('INSERT INTO Deseos (nombre, link, id_user) VALUES (?, ?, ?)', [id_usuario, nombre, link]);

        // Devuelve el resultado de la inserción
        res.json(result);
    } catch (error) {
        console.error('Error al crear deseos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.get('/eliminar_deseos', async (req, res) => {
    return res.json("Ruta para eliminar deseos");
});

app.get('/registra_usuarios', async (req, res) => {
    return res.json("Ruta registrar usuarios");
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor en: http://localhost:${PORT}`);
});
