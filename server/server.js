import express from "express";
import { pool, testConnection } from "../db/conectionPostgresSQL.js";
import path from "path";
import { fileURLToPath } from "url";
import { obtenerDatoPelicula, obtenerDatoUsuario, obtenerUsuarioPorCredenciales } from "../db/queries.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en cuerpo de peticiones
app.use(express.json());

// Middleware para parsear datos de formularios (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '..')));

// Endpoint para obtener propiedad específica de una película por id
app.get('/api/peliculas/:id/:propiedad', async (req, res) => {
    const id = parseInt(req.params.id);
    const propiedad = req.params.propiedad;

    const datoPelicula = await obtenerDatoPelicula(id, propiedad);
    if (datoPelicula !== null) {
        res.json({ [propiedad]: datoPelicula });
    } else {
        res.status(500).json({ error: 'Película o propiedad no encontrada' });
    }
});

// Endpoint para obtener propiedad específica de un usuario por id
app.get('/api/usuarios/:id/:propiedad', async (req, res) => {
    const id = parseInt(req.params.id);
    const propiedad = req.params.propiedad;

    const dato = await obtenerDatoUsuario(id, propiedad);

    if (dato !== null) {
        res.json({ [propiedad]: dato });
    } else {
        res.status(404).json({ error: 'Usuario o propiedad no encontrada' });
    }
});

// Endpoint para obtener todos los datos de una película por id
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

// Endpoint POST login con redirección si éxito
app.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ error: "Correo y contraseña requeridos" });
    }

    try {
        const usuario = await obtenerUsuarioPorCredenciales(correo, contrasena);

        if (usuario) {
            // Usuario válido, redirige a cartelera
            return res.redirect('http://localhost:3000/sedes.html');
        } else {
            // Credenciales no coinciden
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ error: "Error del servidor" });
    }
});

async function iniciarServidor() {
    const dbConnected = await testConnection();
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
