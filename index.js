import express from "express";
import { config } from "dotenv";
import pg from 'pg'

const app=express();
const pool= new pg.Pool({
    connectionString: process.env.DATABASE_URL
})
app.get('/', (req, res)=>{
    res.send("Servidor en lina nicolas")
})
app.get('/ping', async (req, res)=>{
    const response=await pool.query('SELECT NOW()')
    return res.json(result.rows[0])
})
app.listen(5000)
console.log("servidor en:"+ 5000);