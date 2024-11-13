const express = require ('express')
const path = require('path')
const multer = require('multer')
const app= express()

const folder = path.join(__dirname+'Archivos');
const upload = multer({dest:folder});

app.use(express.json())
app.use(express.text())/* 
app.use(express.urlencoded({extended:true})) */
app.use(upload.single('Archivo'));
/* 
format.parse
 */




app.post('/Formulario', (req,res) =>{
   
    console.log(req.body);
    res.send(`Hola ${req.body.nombre}`)
})

app.listen(3000, ()=> {
    console.warn('Hola mundo express')
    console.log(`Servidor escuchando en el puerto 8080`)
})