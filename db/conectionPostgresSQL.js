import { Pool } from 'pg';

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "pelitime_prueba",
    user: "postgres",
<<<<<<< HEAD
    password: "123456",
=======
<<<<<<< HEAD
    password: "123",
=======
    password: "America1927",
>>>>>>> 58d84723cf7a43142e21799efe35e5c1e1eed7c9
>>>>>>> 931dcbf226ece1fde803cf5ec7d256354b280e49
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('¡Conexión exitosa a PostgreSQL!');
        const res = await client.query('SELECT NOW()');
        console.log('Fecha y hora actual desde la DB:', res.rows[0].now);
        client.release(); // Libera el cliente de vuelta al pool
        return true;
    } catch (err) {
        console.error('Error al conectar a PostgreSQL:', err.message);
        return false;
    }
}

export {
    pool,
    testConnection
};