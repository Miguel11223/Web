const express = require('express');
const router = express.Router();
const{
    getEventos,
    getEvento,
    editEvento,
    createEvento,
    deleteEvento
}= require('../controllers/eventController');

router.get('/',getEventos);
router.get('/:id',getEvento);
 router.put('/:id',editEvento);
router.post('/',createEvento);
 router.delete('/:id',deleteEvento);

module.exports=router;