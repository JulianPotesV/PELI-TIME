document.addEventListener('DOMContentLoaded', () => {
    // carga el menu en las paginas
        fetch('menu.html')
            .then(response => response.text())
            .then(data =>{
                document.getElementById("menu-container").innerHTML = data;
            })
    // carga el footer en las paginas
        fetch('footer.html')
            .then(response => response.text())
            .then(data =>{
                document.getElementById("cotenedor-footer").innerHTML = data;
            })
    });