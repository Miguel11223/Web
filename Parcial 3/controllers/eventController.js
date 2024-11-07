const { json } = require("express");
const db = require('../config/mysql')
const {
selectEventos,
selectEvento,
updateEvento,
insertEvento,
deleteEvento
}=require('../dal/mysql');
const { eventos } = require("../dal/local");

exports.getEvento =  async (req, res) => {

          const { id } = req.params;      
        try{
             const evento = await selectEvento(id);

             if(evento){
                 res.status(200).json(evento);
                 console.info(evento);
            }else{
                 res.status(500).json("ERROR NO EXISTE")
             }

        }catch(err){
             res.status(500).json(err.message);       }

      

}

exports.getEventos= async (req,res) =>{
    const eventos = await selectEventos()
    res.status(200).json(eventos);

}

exports.editEvento= async(req,res)=>{
     const{ id }= req.params;
    const {nombre, descripcion,fecha,lugar} = req.body;
    const filasAfectadas =  await updateEvento(id, nombre, descripcion,fecha,lugar);

    try{
        if(filasAfectadas){
            res.status(200).json(`Se realizaron modificaciones en el evento:  ${filasAfectadas} `)
        }else{
            res.status(404).json('Evento no encontrado')
        }
        
        
    }catch(err){
        res.status(500).json(err.message)
    }
    
   

    

}

exports.createEvento= async (req,res)=>{
     const {nombre,descripcion,fecha,lugar} = req.body;
try{
    if(!nombre){
        res.status(400).json('El nombre no es valido');
     }
     if(!descripcion){
        res.status(400).json('El nombre no es valido');
     }
     if(!lugar){
        res.status(400).json('El nombre no es valido');
     }
     if(!fecha){
        fecha= new Date();
     }

    const id =  await insertEvento(nombre,descripcion,fecha,lugar);  

    res.status(200).json(`Se creo un nuevo evento: ${nombre}, con id ${id}`);
}catch(err){
    console.info(err.message)
}
   
}

 exports.deleteEvento= async(req, res) => {
    const { id } = req.params;
    try{

        const evento = await deleteEvento(id);


        if(evento){
            
            res.status(200).json( `Se elimino el evento: ${id}`);
            
       }else{
            res.status(500).json("ERROR NO EXISTE")
        }

   }catch(err){
        res.status(500).json(err.message);      
    }

  
}