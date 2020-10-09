window.onload= contadores();

var contadorUsuario=0;
var contadorAviso=0;

function  contadores(){
     contadorUsuario = 0;
     contadorAviso = 0;
}

function desplegarMenuUsuario(){
    mostrarmenu("despliegue","mostrar");
    contadorUsuario++;
    if(contadorUsuario%2==0){
        cambiarFlechaDerecha("fondo_flecha1");
    }
    else{
        cambiarFlechaAbajo("fondo_flecha1");
    }

}

function desplegarMenuAviso(){
    mostrarmenu("despliegue2","mostrar2");
    contadorAviso++;
    if(contadorAviso%2==0){
        cambiarFlechaDerecha("fondo_flecha2");
    }
    else{
        cambiarFlechaAbajo("fondo_flecha2");
    }

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
function cambiarFlechaDerecha(a1){
   let imagen = document.getElementById(a1)
    imagen.style.backgroundImage = "url('./imagenes/flecha-derecha.png')";
}
function cambiarFlechaAbajo(a1){
    let imagen = document.getElementById(a1)
    imagen.style.backgroundImage = "url('./imagenes/flecha-abajo.png')";
}


