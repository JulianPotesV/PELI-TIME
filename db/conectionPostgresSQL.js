import { Pool } from 'pg';

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "pelitime_bd",
    user: "postgres",
    password: "123456",
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