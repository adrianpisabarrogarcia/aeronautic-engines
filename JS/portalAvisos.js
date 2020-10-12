function crearAviso(){
    let avisos =JSON.parse(localStorage.getItem("datosAviso"));
    if(avisos == null){
        var listaAnuncios = [];
        let avi = new Aviso( "Primer aviso", "09/10/2020", "Primer aviso creado.")
        listaAnuncios.push(avi);
        localStorage.setItem('datosAviso',JSON.stringify(listaAnuncios));
    }
    let avisos2 = JSON.parse(localStorage.getItem("datosAviso"));
    let error= comprobarDatosAviso("tit", "fech", "descrip");
    if (!error){
        try{
            //Introducimos los datos del aviso
            let titulo= document.getElementById("tit").value;
            let fecha= document.getElementById("fech").value;
            let descripcion= document.getElementById("descrip").value;

            let avis = new Aviso(titulo, fecha, descripcion);
            avisos2.push(avis);
            localStorage.setItem('datosAviso',JSON.stringify(avisos2));
            alert(" Aviso con titulo "+titulo+ " insertado");
            borrarCamposAviso("tit","fech","descrip");
        }catch (err){
            alert(err)
        }

    }


}

function borrarAviso() {
    try{
        let datosAvi = JSON.parse(localStorage.getItem("datosAviso"));
        let aviso = document.getElementById("borrar_anun").value;
        let i;
        for(i=0; i<datosAvi.length && !(aviso ==datosAvi[i].titulo);i++){

        }
        if(i == datosAvi.length){
            document.getElementById("borrar_anun").value = "";
            throw "Aviso no encontrado, prueba de nuevo";
        }
        else{
            document.getElementById("borrar_anun").value = "";
            datosAvi.splice(i,1);
            localStorage.setItem('datosAviso',JSON.stringify(datosAvi));
            alert("Aviso con titulo: "+aviso+ " eliminado.");

        }

    }
    catch (e) {
        alert(e);
    }


}

function modificarAviso(){
    try{
        let datosAviso = JSON.parse(localStorage.getItem('datosAviso'));
        let aviso = document.getElementById("buscar_aviso").value ;

        let i;

        for (i=0; i<datosAviso.length && !(aviso ==datosAviso[i].titulo); i++){

        }
        if(i == datosAviso.length){
            document.getElementById("buscar_aviso").value = "";
            throw "Aviso no encontrado, intentalo de nuevo.";
        }
        else{
            let div = document.getElementById("modify_aviso");
            div.style.display = "flex";
            let div2= document.getElementById("buscar_anuncio");
            div2.style.display = "none";

            document.getElementById("title").value = datosAviso[i].titulo;
            document.getElementById("date").value = datosAviso[i].fecha;
            document.getElementById("desc").value = datosAviso[i].descripcion;
        }

    }
    catch (e) {
        alert(e);
    }
}

function actualizarAviso() {
    let listaAvisos = JSON.parse(localStorage.getItem("datosAviso"));
    let aviso = document.getElementById("buscar_aviso").value ;
    let i;
    for(i=0; i<listaAvisos.length && !(aviso==listaAvisos[i].titulo);i++){

    }
    if(i== listaAvisos.length){
        borrarCamposAviso("title","date","descrp");
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

            listaAvisos[i].fecha= fech;

            listaAvisos[i].descripcion= descripcio;

            localStorage.setItem('datosAviso',JSON.stringify(listaAvisos));

            let div = document.getElementById("modify_aviso")
            div.style.display = "none";
            let div2 = document.getElementById("buscar_anuncio")
            div2.style.display = "flex";
            document.getElementById("buscar_aviso").value = ""

        }
        catch (e) {
            alert(e);
        }

    }

}
mostrarAnuncio();
function mostrarAnuncio(){
    let listaAviso= JSON.parse(localStorage.getItem("datosAviso"));

    document.getElementById("titulo").value = listaAviso[0].titulo;
    document.getElementById("fecha").value = listaAviso[0].fecha;
    document.getElementById("descri").value = listaAviso[0].descripcion;
}

let listaAviso= JSON.parse(localStorage.getItem("datosAviso"));
var i=0;
var x=0;
function siguiente(){

    let botonadelante= document.getElementById("siguiente").onclick;

    if(botonadelante){
        i=parseInt(i);

         i+=1;
        x=i;

        console.log(i);
        console.log(x);
        if(i==listaAviso.length){
            i=0;
            document.getElementById("titulo").value = listaAviso[i].titulo;
            document.getElementById("fecha").value = listaAviso[i].fecha;
            document.getElementById("descri").value = listaAviso[i].descripcion;
        }else{
            document.getElementById("titulo").value = listaAviso[i].titulo;
            document.getElementById("fecha").value = listaAviso[i].fecha;
            document.getElementById("descri").value = listaAviso[i].descripcion;
        }


    }

}


function anterior(){
    let botonatras= document.getElementById("siguiente").onclick;

    if(botonatras){

        x-=1;
        i=x;

        console.log(x);
        if(x==0) {
            x = listaAviso.length;
        }
            document.getElementById("titulo").value = listaAviso[x].titulo;
            document.getElementById("fecha").value = listaAviso[x].fecha;
            document.getElementById("descri").value = listaAviso[x].descripcion;



    }
}

function comprobarDatosAviso(titulo2, fecha2, descripcion2){
    let textoerror = "";
    let erroravisos = false;
    try{
        //Titulo
        let titulo = document.getElementById(titulo2).value;
        let exptitulo = new RegExp("^([A-Za-z]+[ ]?)+$");
        if(!exptitulo.test(titulo)){
            textoerror += "El titulo introducido no cumple con las caracteristicas necesarias.\n";
            erroravisos= true;
        }

        //Fecha
        let fecha = document.getElementById(fecha2).value;
        let expfecha= new RegExp("^(([0-2][0-9]|3[0-1])/(0[1-9]|1[0-2)])/(19[7-9][0-9]|20[0-1][0-9]|2020))$");
        if(!expfecha.test(fecha)){
            textoerror +="El formato de la fecha es incorrecto.\n";
            erroravisos = true;
        }else{
            let dia = fecha.substring(0,2);
            let mes = fecha.substring(3,5);
            let anno = fecha.substring(6);
            let fechaDate = new Date(anno,mes-1,dia);
            let fechaHoy = new Date();
            if(fechaDate > fechaHoy){
                textoerror += "La fecha introducida no es posible.\n"
                erroravisos = true;
            }
        }
        //Decripcion
        let descrition = document.getElementById(descripcion2).value;
        if(descrition == ""){
            textoerror +="No se puede dejar el campo Descripción vacío.\n";
            erroravisos = true;
        }
        if(erroravisos){
            throw textoerror;
        }

    }
    catch (err){
        alert(err);
        return erroravisos;
    }

}

function borrarCamposAviso(title3,fech3,descrip3){
    document.getElementById(title3).value = "";
    document.getElementById(fech3).value = "";
    document.getElementById(descrip3).value = "";
}