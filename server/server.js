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

insertarPelicula({
    titulo: "Kraven el cazador",
    descripcion: "Se centra en el origen de Kraven y su camino hacia convertirse en un cazador implacable. Explora la compleja relación del personaje con su padre, Nikolai Kravinoff, y cómo esta dinámica impulsa su sed de venganza y su obsesión por superarlo, lo que conduce a brutales consecuencias.",
    duracion: 127,
    clasificacion: "2D - Doblada",
    genero: "Acción/Ciencia ficción"
});

insertarPelicula({
    titulo: "Mohana 2",
    descripcion: "Moana 2, ambientada tres años después de la primera película, muestra a Moana respondiendo a una llamada inesperada de sus ancestros. Esto la lleva a embarcarse en un viaje a los lejanos mares de Oceanía, junto con Maui y un equipo de navegación, adentrándose en aguas peligrosas y desconocidas.",
    duracion: 100,
    clasificacion: "2D - Doblada",
    genero: "Infantil/Aventura"
});

insertarPelicula({
    titulo: "Mufasa",
    descripcion: "Conoce a Taka, un leoncito, y su vida da un giro. Aaron Pierre es quien interpreta a Mufasa en la película. La historia de Mufasa es fundamental para entender la trama de 'El Rey León'.",
    duracion: 120,
    clasificacion: "2D - Doblada",
    genero: "Aventura/Musical"
});

insertarPelicula({
    titulo: "Nosferatu",
    descripcion: "Nosferatu, la película dirigida por Robert Eggers, es una historia gótica que explora la obsesión entre una joven y un vampiro aterrador. La película es descrita como de terror gótico, con un enfoque en el terror y la atmósfera.",
    duracion: 122,
    clasificacion: "2D - Latino",
    genero: "Terror/Misterio"
});



