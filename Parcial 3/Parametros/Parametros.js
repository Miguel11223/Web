const express = require ('express')
const app= express()
app.use(express.json())

app.get('/administrativos', (req,res) =>{
    console.log(req.query);
    
    res.send('Hello world express')
})
app.get('/maestros', (req,res) =>{
   
    console.log(req.body);
   
    res.send('Hello world express')
})

app.get('/estudiantes/:carrera', (req,res) =>{
  
    console.log(req.params.carrera);
    console.log(req.query.control);
    
    res.send('Hello world express')
})

app.listen(3000, ()=> {
    console.warn('Hola mundo express')
    console.log(`Servidor escuchando en el puerto 8080`)
})