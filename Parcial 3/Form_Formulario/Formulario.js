const express = require ('express')
const path = require('path')
const multer = require('multer')
var cors = require('cors')
const jspdf = require('jspdf')
const app= express()

const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null,path.join(__dirname+'//Archivosrec/'))
    },
    filename: function(req, file, cb ){
        cb(null,file.fieldname + '-' + Date.now())
    }
})

const folder = path.join(__dirname+'/Archivos/');
const upload = multer({dest:folder});

app.use(express.json())
app.use(express.text())/* 
app.use(express.urlencoded({extended:true})) */
app.use(upload.single('Archivo'));
app.use(cors())
/* 
format.parse
 */




app.post('/Formulario', (req,res) =>{
   
    console.log(req.body);
    const doc = new jsPDF();
    doc.text(`Hola ${req.body.nombre}`,10,10);
    doc.save(path.join(__dirname,'/Archivosgen/a4.pdf'))
    res.sendFile(__dirname,'/Archivosgen/a4.pdf')
})

app.listen(3030, ()=> {
    console.warn('Hola mundo express')
    console.log(`Servidor escuchando en el puerto 8080`)
})