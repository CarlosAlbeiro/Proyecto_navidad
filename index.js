import express from "express";

const app=express();

app.get('/', (req, res)=>{
    res.send("Servidor en linea")
})
app.listen(5000)
console.log("servidor en:"+ 5000);