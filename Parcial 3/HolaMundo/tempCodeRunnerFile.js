const express = require ('express')
const app= express()

app.get('/', (req,res) =>{
    res.send('Hello world express')
})

app.listen(8082, ()=> {
    console.warn('Hola mundo express')
    console.log(`Servidor escuchando en el puerto 8082`)
})