import express from "express";
import { config } from "dotenv";
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

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

const puerto = process.env.PORT || 3000;

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

app.post('/registrar_usuarios', async (req, res) => {
    // Obtén los parámetros de la URL
    const { usuario, password } = req.query;

    try {
        // Hashear la contraseña con el salt
        const  hashedPassword = bcrypt.hash(password, 10);

        // Verifica que todos los parámetros necesarios estén presentes
        if (!usuario || !password) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }
        const [response] = await pool.query('INSERT INTO Users(id, name, password) VALUES (NULL,?,?)', [usuario, hashedPassword]);
        if (response) {
            res.status(200).json({ succes: 'Registro exitoso' });
        } else {
            res.status(500).json({ error: 'Error en la insercion' });
        }
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/login', async (req, res) => {
    try {
        // Obtén los parámetros de la URL
        const { usuario, password } = req.query;

        // Verifica que todos los parámetros necesarios estén presentes
        if (!usuario || !password) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }
        // Genera un hash (encriptación) de la contraseña
        const hashedPassword = bcrypt.hash(password, 10);
        // Realiza la inserción en la base de datos
        const [result] = await pool.query('SELECT * FROM Users WHERE name=? AND password=?', [usuario, hashedPassword]);

        if (result.length > 0) {
            // Devuelve el resultado de la inserción
            res.json(result);
        } else {
            // La consulta no devolvió datos, puedes manejar esto de acuerdo a tus necesidades
            res.status(500).json({ error: 'Datos erroneos' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/deseos', async (req, res) => {
    try {

        // Realiza la inserción en la base de datos
        const [result] = await pool.query('SELECT *.Deseos, name.Users FROM Deseos  INNER JOIN Users ON Deseos.id_user=Users.id ');

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(500).json({ error: 'Error en la validacion' });
        }
        // Devuelve el resultado de la inserción
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/crear_deseos', async (req, res) => {
    try {
        // Obtén los parámetros de la URL
        const { id_usuario, nombre, link, descripcion } = req.query;

        // Verifica que todos los parámetros necesarios estén presentes
        if (!id_usuario || !nombre) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }

        // Realiza la inserción en la base de datos
        const [result] = await pool.query('INSERT INTO Deseos (nombre, link, descripcion, id_user) VALUES (?, ?, ?,?)', [nombre, link, descripcion, id_usuario]);

        if (result) {
            res.json(result);
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        // Devuelve el resultado de la inserción
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/eliminar_deseos', async (req, res) => {
    try {
        // Obtén los parámetros de la URL
        const { id } = req.query;

        // Verifica que todos los parámetros necesarios estén presentes
        if (!id) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }

        // Realiza la inserción en la base de datos
        const [result] = await pool.query('DELETE FROM Deseos WHERE id=?', [id]);

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        // Devuelve el resultado de la inserción
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(puerto, () => {
    console.log(`Servidor en: ${puerto}`);
});