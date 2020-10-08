function desplegarMenuUsuario(){
    mostrarmenu("despliegue","mostrar");
    cambiarImagen("fondo_flecha1");
}

function desplegarMenuAviso(){
    mostrarmenu("despliegue2","mostrar2");
    cambiarImagen("fondo_flecha2");
}

function desplegarAjustesUsuario(){
    mostrarmenu("configuracion","mostrar3");
    window.onclick = function(event) {
        if (!event.target.matches('.desplegar3')) {
            let dropdowns = document.getElementsByClassName("opciones");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('mostrar3')) {
                    openDropdown.classList.remove('mostrar3');
                }
            }
        }
    }
}

function mostrarmenu(a1,a2){
    document.getElementById(a1).classList.toggle(a2);
}
function cambiarImagen(b){
    var imagen= document.getElementById(b);
    imagen.style.backgroundImage = "url('./imagenes/flecha-abajo.png')";

}

