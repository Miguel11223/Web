const express = require ('express')

const app= express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.post('/Formulario', (req,res) =>{
   
    console.log(req.body);
    res.send(`Hola ${req.body.nombre}`)
})

app.listen(3000, ()=> {
    console.warn('Hola mundo express')
    console.log(`Servidor escuchando en el puerto 8080`)
})