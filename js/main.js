document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM listo. Cargando menú...");

    fetch('contenido-menu.html')
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar contenido-menu.html");
            return response.text();
        })
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;
            console.log("Menú insertado");

            const userParagraph = document.querySelector('#usuario p');
            if (!userParagraph) {
                console.warn("No se encontró #usuario p en el DOM");
                return;
            }

            const userId = 1116266669;
            console.log(`Consultando usuario con ID ${userId}...`);

            return fetch(`/api/usuarios/${userId}/nombre`)
                .then(response => {
                    if (!response.ok) throw new Error(`Error al cargar usuario: ${response.statusText}`);
                    return response.json();
                })
                .then(userData => {
                    console.log("Datos recibidos del usuario:", userData);
                    if (userData.nombre) {
                        userParagraph.textContent = userData.nombre;
                    } else {
                        userParagraph.textContent = 'Usuario no encontrado';
                    }
                });
        })
        .catch(error => {
            console.error('Error durante la carga del menú o usuario:', error);
            const userParagraph = document.querySelector('#usuario p');
            if (userParagraph) userParagraph.textContent = 'Error al cargar';
        });

    // Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("cotenedor-footer").innerHTML = data;
        })
        .catch(err => {
            console.error("Error al cargar footer:", err);
        });

    
});

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const peliculaId = params.get('id');

    if (peliculaId) {
        fetch(`/api/peliculas/${peliculaId}`)
            .then(res => {
                if (!res.ok) throw new Error("No se pudo obtener la película");
                return res.json();
            })
            .then(pelicula => {
                renderizarPelicula(pelicula);
            })
            .catch(err => {
                console.error("Error al cargar la película:", err);
            });
    }
});

function renderizarPelicula(peliculas) {
    const infoPelicula = document.getElementById('info-pelicula');

    infoPelicula.querySelector('h1').textContent = peliculas.titulo;
    infoPelicula.querySelector('h2').textContent = peliculas.clasificacion || '2D';
    infoPelicula.querySelector('p').innerHTML = `
        Género: ${peliculas.genero} <br>
        Duración: ${peliculas.duracion} minutos <br>
        Clasificación: ${peliculas.edad} <br>
        Director: ${peliculas.director} <br>
        Actores: ${peliculas.actores}
    `;

    // Sinopsis
    const sinopsis = infoPelicula.querySelectorAll('p')[1];
    if (sinopsis) sinopsis.textContent = peliculas.descripcion;

     // Imagen del póster
    const poster = document.querySelector('#tarjeta-superior img');
    if (poster) poster.src = peliculas.poster;

    // trailer
    const trailer = document.querySelector('#trailer iframe');
    if (poster) trailer.src = peliculas.trailer;
}

document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.boton-cartelera');

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const tarjeta = boton.closest('.pelicula');
            const id = tarjeta.dataset.id;

            // Redirige a la página con el id como parámetro
            window.location.href = `pelicula-seleccionada.html?id=${id}`;
        });
    });
});