import express from "express";
import {pool, testConnection} from "../db/conectionPostgresSQL.js";
import path from "path";
import { fileURLToPath } from "url";
import { obtenerDatoPelicula, obtenerDatoUsuario } from "../db/queries.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Esto es para que el navegador pueda acceder a los archivos HTML, CSS, JS.
app.use(express.static(path.join(__dirname, '..')));

// Endpoint para obtener especifo de una pelicula por su id
app.get('/api/peliculas/:id/:propiedad', async (req, res) => {
    const id = parseInt(req.params.id);
    const propiedad = req.params.propiedad;

    const datoPelicula = await obtenerDatoPelicula(id, propiedad);
    if (datoPelicula !== null) {
        res.json({[propiedad]: datoPelicula}); // Envía un JSON con la priopiedad solicitada
    } else {
        res.status(500).json({ error: 'Pelicula o propiedad no encontrada' });
    }
});

// Endpoint para obtener especifo de un usuario por su id
app.get('/api/usuarios/:id/:propiedad', async (req, res) => {
    const id = parseInt(req.params.id);
    const propiedad = req.params.propiedad;

    const dato = await obtenerDatoUsuario(id, propiedad);

    if (dato !== null) {
        res.json({[propiedad]: dato}); // Envía un JSON con la priopiedad solicitada
    } else {
        res.status(404).json({ error: 'Usuario o propiedad no encontrada'});
    }
});

app.get('/api/peliculas/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM peliculas WHERE idpeliculas = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener la película:", error.message);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


async function iniciarServidor() {
    const dbConnected = await testConnection(); // Prueba la conexión a la DB
    if (dbConnected) {
        console.log("Ruta de usuarios lista en: /api/usuarios/:id/:propiedad");
        app.listen(PORT, () => {
            console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
            console.log(`API de películas disponible en: http://localhost:${PORT}/api/peliculas`);
            console.log(`Ejemplo de API de usuario (nombre): http://localhost:${PORT}/api/usuarios/1116266669/nombre`);
        });
    } else {
        console.error('No se pudo iniciar el servidor porque la conexión a la base de datos falló.');
        process.exit(1);
    }
}

iniciarServidor();