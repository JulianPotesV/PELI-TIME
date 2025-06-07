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

// Cargar la película seleccionada al cargar la página

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

// Función para renderizar la información de la película

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

// Manejo de eventos para los botones de la cartelera

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

// Manejo de eventos para la selección de sillas

document.addEventListener('DOMContentLoaded', () => {
    const sillas = document.querySelectorAll('.silla-disponible');
    const contenedorSeleccion = document.getElementById('sillas-seleccionadas');
    let sillasSeleccionadas = [];

    sillas.forEach(silla => {
        silla.addEventListener('click', () => {
            const id = silla.dataset.id;

            if (silla.classList.contains('escogida')) {
                // Quitar selección
                silla.classList.remove('escogida');
                sillasSeleccionadas = sillasSeleccionadas.filter(s => s !== id);
            } else {
                // Agregar selección
                silla.classList.add('escogida');
                sillasSeleccionadas.push(id);
            }

            // Actualizar el display
            contenedorSeleccion.innerHTML = '';
            sillasSeleccionadas.forEach(sillaId => {
                const span = document.createElement('span');
                span.textContent = sillaId + ' ';
                contenedorSeleccion.appendChild(span);
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const idPelicula = params.get('id');

  if (idPelicula) {
    fetch(`/api/peliculas/${idPelicula}`)
      .then(res => {
        if (!res.ok) throw new Error("Película no encontrada");
        return res.json();
      })
      .then(peliculas => {
        document.getElementById('titulo-pelicula').textContent = peliculas.titulo;
        document.getElementById('banner-asientos').style.backgroundImage = `url('${peliculas.banner}')`;
        document.getElementById('info-pelicula').textContent = 
          `${peliculas.ubicacion || 'Centro Comercial Tuluá'} - ${peliculas.formato || '2D'} - ${peliculas.edad || 'APT'} - Sala ${peliculas.sala || '3'}`;
      })
      .catch(err => {
        console.error("Error al cargar la información de la película:", err);
        document.getElementById('titulo-pelicula').textContent = "Película no encontrada";
        document.getElementById('info-pelicula').textContent = "";
      });
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const botonComprar = document.getElementById('comprar-boletos');
    if (botonComprar) {
        const params = new URLSearchParams(window.location.search);
        const peliculaId = params.get('id');

        botonComprar.addEventListener('click', () => {
            if (peliculaId) {
                window.location.href = `elegir-asientos.html?id=${peliculaId}`;
            } else {
                console.warn('No hay ID de película en la URL');
            }
        });
    }
});