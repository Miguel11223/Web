const db = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = db.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
    console.info("Conexión exitosa");
});

module.exports = connection;