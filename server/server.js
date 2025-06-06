import {pool} from "../db/conectionPostgresSQL.js";

const obtenerDatoPelicula = async (idpeliculas, propiedad) => {
    try {
        const resultado = await pool.query("SELECT " + propiedad + " FROM peliculas WHERE idpeliculas = " + idpeliculas);
        return resultado.rows[0][propiedad]
    } catch (error) {
        console.log(error);
        return null;
    }   
};

const insertarPelicula = async (pelicula) => {
    const { titulo, descripcion, duracion, clasificacion, genero } = pelicula;

    try {
        const resultado = await pool.query(
            "INSERT INTO peliculas (titulo, descripcion, duracion, clasificacion, genero) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [titulo, descripcion, duracion, clasificacion, genero]
        );

        console.log("Película insertada:", resultado.rows[0]);
        return resultado.rows[0];
    } catch (error) {
        console.error("Error al insertar la película:", error);
        return null;
    }
};

const obtenerDatoUsuario = async (idusuario, propiedad) => {
    try {
        const resultado = await pool.query("SELECT " + propiedad + " FROM usuarios WHERE idusuario = " + idusuario);
        return resultado.rows[0][propiedad]
    } catch (error) {
        console.log(error);
        return null;
    } 
};  

console.log(await obtenerDatoUsuario(1116266669,"nombre"));


