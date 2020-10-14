//menu
function anadiraviso() {
    mostraryocultar("crear_aviso", "crear_usuario", "borrar_usuario", "lista_usuarios", "modificar_usuario", "borrar_anuncio", "modificar_aviso", "tablonAnuncios");
    borrar();
}

function borraraviso() {
    mostraryocultar("borrar_anuncio", "crear_aviso", "crear_usuario", "lista_usuarios", "borrar_usuario", "modificar_usuario", "modificar_aviso", "tablonAnuncios");
    borrar();

}

function modaviso() {
    mostraryocultar("modificar_aviso", "crear_usuario", "borrar_usuario", "modificar_usuario", "lista_usuarios", "crear_aviso", "borrar_anuncio", "tablonAnuncios");
    borrar();
    restablecerDivModificarAvisos();
}

function tablon() {
    mostraryocultar("tablonAnuncios", "crear_usuario", "borrar_usuario", "modificar_usuario", "lista_usuarios", "crear_aviso", "borrar_anuncio", "modificar_aviso");
    borrar();
    mostrarAnuncio()
}

function mostraryocultar(a1, a2, a3, a4, a5, a6, a7, a8) {
    document.getElementById(a1).style.display = "flex";
    let variables = [a2, a3, a4, a5, a6, a7, a8];
    for (let i in variables) {
        document.getElementById(variables[i]).style.display = "none";
    }
}

function borrar() {
    borrarCampos();
    borrardatosaviso();
}

function borrardatosaviso() {
    let avi = ["tit", "fech", "descrip", "buscar_aviso", "borrar_anun", "title", "date", "label_descripcion", "desc"];
    for (let x in avi)
        document.getElementById(avi[x]).value = "";
}

function borrarCampos() {
    document.getElementById("user").value = ""
    document.getElementById("contraseña").value = ""
    document.getElementById("Nombre").value = ""
    document.getElementById("apellido").value = ""
    document.getElementById("dni").value = ""

}

//funciones de avisos
function primeraviso() {
    let avisos = JSON.parse(localStorage.getItem("datosAviso"));
    if (avisos == null) {
        let listaAnuncios = [];
        let avi = new Aviso("Primer aviso", "09/10/2020", "Primer aviso creado.")
        listaAnuncios.push(avi);
        localStorage.setItem('datosAviso', JSON.stringify(listaAnuncios));
    }
    mostrarAnuncio();
}


function crearAviso() {

    let avisos2 = JSON.parse(localStorage.getItem("datosAviso"));
    let error = comprobarDatosAviso("tit", "fech", "descrip");
    if (!error) {
        try {
            //Introducimos los datos del aviso
            let titulo = document.getElementById("tit").value;
            let fecha = document.getElementById("fech").value;
            let descripcion = document.getElementById("descrip").value;
            let dia = fecha.substring(8);
            let mes = fecha.substring(5, 7);
            let anno = fecha.substring(0, 4);
            fecha = dia + "/" + mes + "/" + anno;
            if (fecha == "//") {
                throw "La fecha es obligatoria";
            }
            let avis = new Aviso(titulo, fecha, descripcion);
            avisos2.push(avis);
            localStorage.setItem('datosAviso', JSON.stringify(avisos2));
            alert(" Aviso con titulo " + titulo + " insertado");
            borrarCamposAviso("tit", "fech", "descrip");
        } catch (err) {
            alert(err)
        }

    }


}

function borrarAviso() {
    try {
        let datosAvi = JSON.parse(localStorage.getItem("datosAviso"));
        let aviso = document.getElementById("borrar_anun").value;
        let i;
        for (i = 0; i < datosAvi.length && !(aviso == datosAvi[i].titulo); i++) {

        }
        if (i == datosAvi.length) {
            document.getElementById("borrar_anun").value = "";
            throw "Aviso no encontrado, prueba de nuevo";
        } else {
            document.getElementById("borrar_anun").value = "";
            datosAvi.splice(i, 1);
            localStorage.setItem('datosAviso', JSON.stringify(datosAvi));
            alert("Aviso con titulo: " + aviso + " eliminado.");

        }

    } catch (e) {
        alert(e);
    }


}

function modificarAviso() {
    try {
        let datosAviso = JSON.parse(localStorage.getItem('datosAviso'));
        let aviso = document.getElementById("buscar_aviso").value;

        let i;

        for (i = 0; i < datosAviso.length && !(aviso == datosAviso[i].titulo); i++) {

        }
        if (i == datosAviso.length) {
            document.getElementById("buscar_aviso").value = "";
            throw "Aviso no encontrado, intentalo de nuevo.";
        } else {
            let div = document.getElementById("modify_aviso");
            div.style.display = "flex";
            let div2 = document.getElementById("buscar_anuncio");
            div2.style.display = "none";

            document.getElementById("title").value = datosAviso[i].titulo;
            let dia = datosAviso[i].fecha.substring(0, 2);
            let mes = datosAviso[i].fecha.substring(3, 5);
            let anno = datosAviso[i].fecha.substring(6);
            let fecha = anno + "-" + mes + "-" + dia;
            document.getElementById("date").value = fecha;
            document.getElementById("desc").value = datosAviso[i].descripcion;
        }

    } catch (e) {
        alert(e);
    }
}

function actualizarAviso() {
    let listaAvisos = JSON.parse(localStorage.getItem("datosAviso"));
    let aviso = document.getElementById("buscar_aviso").value;
    let i;
    for (i = 0; i < listaAvisos.length && !(aviso == listaAvisos[i].titulo); i++) {

    }
    if (i == listaAvisos.length) {
        borrarCamposAviso("title", "date", "descrp");
    }
    let error = comprobarDatosAviso("title", "date", "desc");
    let titul;
    let fech;
    let descripcio;
    if (!error) {
        try {
            //Introducimos los datos del aviso
            titul = document.getElementById("title").value
            fech = document.getElementById("date").value;
            descripcio = document.getElementById("desc").value;

            listaAvisos[i].titulo = titul;

            let dia = fech.substring(8);
            let mes = fech.substring(5, 7);
            let anno = fech.substring(0, 4);
            fech = dia + "/" + mes + "/" + anno;
            if (fech == "//") {
                throw "La fecha es obligatoria";
            }
            listaAvisos[i].fecha = fech;


            listaAvisos[i].descripcion = descripcio;

            localStorage.setItem('datosAviso', JSON.stringify(listaAvisos));
            alert("Aviso "+titul+" modificado");
            restablecerDivModificarAvisos();

        } catch (e) {
            alert(e);
        }

    }

}

function restablecerDivModificarAvisos() {
    let div = document.getElementById("modify_aviso")
    div.style.display = "none";
    let div2 = document.getElementById("buscar_anuncio")
    div2.style.display = "flex";
    document.getElementById("buscar_aviso").value = ""
}

function mostrarAnuncio() {
    let listaAviso = JSON.parse(localStorage.getItem("datosAviso"));

    document.getElementById("titulo").value = listaAviso[0].titulo;
    document.getElementById("fecha").value = listaAviso[0].fecha;
    document.getElementById("descri").value = listaAviso[0].descripcion;
}

var i = 0;
var x = 0;

function siguiente() {
    let listaAviso = JSON.parse(localStorage.getItem("datosAviso"));

    let botonadelante = document.getElementById("siguiente").onclick;

    if (botonadelante) {
        i = parseInt(i);

        i++;
        x = i;

        //console.log(i);
        //console.log(x);
        if (i == listaAviso.length) {
            i = 0;
        }

        document.getElementById("titulo").value = listaAviso[i].titulo;
        document.getElementById("fecha").value = listaAviso[i].fecha;
        document.getElementById("descri").value = listaAviso[i].descripcion;


    }

}


function anterior() {
    let listaAviso = JSON.parse(localStorage.getItem("datosAviso"));

    let botonatras = document.getElementById("siguiente").onclick;

    if (botonatras) {

        x -= 1;
        i = x;

        console.log(x);
        if (x < 0) {
            x = listaAviso.length - 1;
        }
        document.getElementById("titulo").value = listaAviso[x].titulo;
        document.getElementById("fecha").value = listaAviso[x].fecha;
        document.getElementById("descri").value = listaAviso[x].descripcion;


    }
}

function comprobarDatosAviso(titulo2, fecha2, descripcion2) {
    let textoerror = "";
    let erroravisos = false;
    try {
        //Titulo
        let titulo = document.getElementById(titulo2).value;
        let exptitulo = new RegExp("^([A-Za-z]+[ ]?)+$");
        if (!exptitulo.test(titulo)) {
            textoerror += "El titulo introducido no cumple con las caracteristicas necesarias.\n";
            erroravisos = true;
        }

        //Fecha
        let fecha = document.getElementById(fecha2).value;
        /*let expfecha = new RegExp("^(([0-2][0-9]|3[0-1])/(0[1-9]|1[0-2)])/(19[7-9][0-9]|20[0-1][0-9]|2020))$");
        if (!expfecha.test(fecha)) {
            textoerror += "El formato de la fecha es incorrecto.\n";
            erroravisos = true;
        }*/
        let dia = fecha.substring(8);
        let mes = fecha.substring(5, 7);
        let anno = fecha.substring(0, 4);
        let fechaDate = new Date(anno, mes - 1, dia);
        let fechaHoy = new Date();
        if (fechaDate > fechaHoy) {
            textoerror += "La fecha introducida no es posible.\n"
            erroravisos = true;
        }
        if (fecha2 == "--") {
            erroravisos = true;
            textoerror += "La fecha es obligatoria";
        }

        //Decripcion
        let descrition = document.getElementById(descripcion2).value;
        if (descrition == "") {
            textoerror += "No se puede dejar el campo Descripción vacío.\n";
            erroravisos = true;
        }
        if (erroravisos) {
            throw textoerror;
        }

    } catch (err) {
        alert(err);
        return erroravisos;
    }

}

function borrarCamposAviso(title3, fech3, descrip3) {
    document.getElementById(title3).value = "";
    document.getElementById(fech3).value = "";
    document.getElementById(descrip3).value = "";
}