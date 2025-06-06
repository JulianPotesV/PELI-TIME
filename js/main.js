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