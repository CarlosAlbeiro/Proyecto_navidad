import express from "express";
import { config } from "dotenv";
import pg from 'pg'

const app=express();
const pool= new pg.Pool({
    connectionString: process.env.DATABASE_URL
})
app.get('/', (req, res)=>{
    res.send("Hola princesa mira un servidor en linea")
})
app.get('/ping', async (req, res)=>{
    const response=await pool.query('SELECT NOW()')
    return res.json(response.rows[0])
})

app.get('/crear_deseos', async (req, res)=>{
    res.send("Ruta para crear deseos")
})

app.get('/eliminar_deseos', async (req, res)=>{
    res.send("Ruta para crear deseos")
})
app.get('/registra_usuarios', async (req, res)=>{
    res.send("Registrar usuarios")
})
app.get('/iniciar_sesion', async (req, res)=>{
    res.send("Login")
})

app.listen(5000)
console.log("servidor en:"+ 5000);