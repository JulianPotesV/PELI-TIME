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

const agregarPelicula = async ()=>{
    try {
        const resultado = await pool.query("INSERT INTO peliculas (idpeliculas, titulo, descripcion, duracion, clasificacion, genero, director, actores)"
                                                                     + "VALUES ($1, $2, $3, $4, $5, $6, $7, $8);", [2, "Mohana 2", "Moana 2 sigue a Moana tres años después de su primera aventura. Guiada por una misteriosa llamada ancestral, se embarca en un nuevo viaje por los mares desconocidos junto a Maui y una inesperada tripulación para proteger a su pueblo.", 100, "todo publico", "animada", "David G. Derrick Jr", "Auliʻi Cravalho, Dwayne 'La Roca' Johnson" ]);
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
};

obtenerDatoPelicula(1, "titulo");