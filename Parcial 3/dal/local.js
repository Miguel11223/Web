const db =require('../config/local');

exports.selectEventos =() =>{
    return db.eventos;
};

exports.selectEvento =(id) =>{
const evento = db.eventos.find(evento => evento.id==id)
return evento;
} 

exports.insertEvento = async (nombre, descripcion, fecha, lugar) => {
   
    const id = await db.eventos.length > 0 ? Number(db.eventos[db.eventos.length - 1].id) + 1 : 1;

    
    db.eventos.push({
        id,
        nombre,
        descripcion,
        fecha,
        lugar
    });

    // Datos
    console.info({
        id,
        nombre,
        descripcion,
        fecha,
        lugar
    });

   
    return id;
};

exports.updateEvento = (id, nombre, descripcion, fecha, lugar) => {
    
    const evento = db.eventos.find(evento => evento.id == id);
    if (!evento) {
        return null;  
    }

    evento.nombre = nombre;
    evento.descripcion = descripcion;
    evento.fecha = fecha;
    evento.lugar = lugar;

    return evento.id;  
}

exports.deleteEvento = (id) => {
    // Buscar el índice del evento por su ID
    const index = db.eventos.findIndex(evento => evento.id == id);
    

    
    if (index !== -1) {
        
        db.eventos.splice(index, 1);
        return true;  
    }

    return false;  
};
