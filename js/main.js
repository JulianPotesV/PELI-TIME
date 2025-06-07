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

// Manejo de eventos para los botones de horario

document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.boton-horario');
  const params = new URLSearchParams(window.location.search);
  const peliculaId = params.get('id');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const hora = boton.dataset.hora;
      if (peliculaId && hora) {
        const url = `elegir-asientos.html?id=${peliculaId}&hora=${encodeURIComponent(hora)}`;
        window.location.href = url;
      } else {
        alert("Faltan datos para continuar.");
      }
    });
  });
});

// Manejo de eventos para la selección de sillas -1

document.addEventListener('DOMContentLoaded', () => {
    const confirmarBtn = document.getElementById('confirmar-silla');
    const contenedorSillas = document.querySelectorAll('.silla-disponible');
    const contenedorSeleccion = document.getElementById('sillas-seleccionadas');
    const params = new URLSearchParams(window.location.search);

    const peliculaId = params.get('id');
    const horaSeleccionada = params.get('hora');
    const sillasSeleccionadas = [];

    contenedorSillas.forEach(silla => {
        silla.addEventListener('click', () => {
            const id = silla.dataset.id;

            if (silla.classList.contains('escogida')) {
                silla.classList.remove('escogida');
                const index = sillasSeleccionadas.indexOf(id);
                if (index !== -1) sillasSeleccionadas.splice(index, 1);
            } else {
                silla.classList.add('escogida');
                sillasSeleccionadas.push(id);
            }

            // Actualizar el display de sillas
            contenedorSeleccion.innerHTML = '';
            sillasSeleccionadas.forEach(sillaId => {
                const span = document.createElement('span');
                span.textContent = sillaId + ' ';
                contenedorSeleccion.appendChild(span);
            });
        });
    });

    confirmarBtn.addEventListener('click', () => {
        if (!peliculaId) return alert("ID de película no definido.");
        if (!horaSeleccionada) return alert("Hora no definida.");
        if (sillasSeleccionadas.length === 0) return alert("Selecciona al menos una silla.");

        const sillasQuery = encodeURIComponent(sillasSeleccionadas.join(','));
        const horaQuery = encodeURIComponent(horaSeleccionada);
        const url = `confirmacion-de-compra.html?id=${peliculaId}&hora=${horaQuery}&sillas=${sillasQuery}`;
        window.location.href = url;
    });
});


// Cargar información de la película al cargar la página

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
    const params = new URLSearchParams(window.location.search);
    const peliculaId = params.get('id');
    const hora = params.get('hora');
    const sillas = params.get('sillas')?.split(',') || [];

    if (!peliculaId) return;

    // Cargar datos de la película
    fetch(`/api/peliculas/${peliculaId}`)
        .then(res => res.json())
        .then(peliculas => {
            document.getElementById('titulo-pelicula').textContent = peliculas.titulo;
            document.getElementById('poster-pelicula').src = peliculas.poster;
            document.getElementById('hora-pelicula').textContent = hora;
            document.getElementById('sala-pelicula').textContent = "3";
            document.getElementById('cine-pelicula').textContent = 'Peli Time Centro Comercial Tulua';
            document.getElementById('sillas-seleccionadas').textContent = sillas.join(' - ');

            const precio = 17000; // puedes calcular esto si hay tipos
            const total = sillas.length * precio;

            document.querySelector('#informacion-compra p:nth-child(2)').textContent = `(${sillas.length} boletos)`;
            document.getElementById('precio-final').textContent = `$${total.toLocaleString('es-CO')}`;
            document.getElementById('sub-total').textContent = `$${total.toLocaleString('es-CO')}`;
        })
        .catch(err => {
            console.error("Error cargando película:", err);
        });

});

document.addEventListener('DOMContentLoaded', () => {
    const userId = 1116266669; // o traído desde login/localStorage

    fetch(`/api/usuarios/${userId}`)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener usuario");
            return res.json();
        })
        .then(usuarios => {
            document.getElementById('nombre-usuario').textContent = `${usuarios.nombre} ${usuarios.apellido}`;
            document.getElementById('cedula-usuario').textContent = userId;
            document.getElementById('correo-usuario').textContent = usuarios.correo;
            document.getElementById('telefono-usuario').textContent = usuarios.telefono;
        })
        .catch(err => {
            console.error("Error cargando datos del usuario:", err);
        });
});