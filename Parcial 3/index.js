const express = require('express');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes')
const db = require('./config/mysql');
//Const reservaRoutes = require('./routes/reservaRoutes');
dotenv.config();


const app = express();
app.use(express.json());

app.use('/api/eventos',eventRoutes);



//app.use('/api/eventos',reservaRoutes);

const PORT= process.env.PORT || 3000;

app.listen(PORT,() => {
    console.warn('Hola Bv')
    console.info(`Servidor corriendo en el puerto ${PORT}` )
});
