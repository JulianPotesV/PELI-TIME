document.addEventListener('DOMContentLoaded', () => {
    // carga el menu en las paginas
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;
        });

    // carga el footer en las paginas
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("cotenedor-footer").innerHTML = data;
        });
    

});

document.addEventListener('DOMContentLoaded',async () => {
        const tituloPelicula = await obtenerDatoPelicula(1, "titulo");
        if (tituloPelicula) {
            const elemento = document.getElementById("titulo-pelicula-1");
            elemento.textContent = tituloPelicula;
        } else {
            console.log("No se encontro la pelicula");
        }
});