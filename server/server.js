// Importar módulos
const express = require('express');
const { Pool } = require('pg');

// Configurar el servidor Express
const app = express();
const port = 3000;

// Configurar la conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: 'postgres',       
    host: 'localhost',      
    database: 'pelitime_bd',
    password: '123456',     
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});