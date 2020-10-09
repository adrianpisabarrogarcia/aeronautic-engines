function crearAviso(){
    let avisos =JSON.parse(localStorage.getItem("datosAviso"));
    let error= comprobarDatosAviso();
    if (!error){
        try{
            //Introducimos los datos del aviso
            let titulo= document.getElementById("tit").value;
            let fecha= document.getElementById("fech").value;
            let descripcion= document.getElementById("descrip").value;
        }catch (err){
            alert(err)
        }

    }
}
function comprobarDatosAviso(){
    let errores = false;
    let textoerror = "";
    try{
        //Titulo
        let titulo = document.getElementById("tit").value;
        let exptitulo = new RegExp("^([A-Z-a-z]+[ ]')+$");
        if(!exptitulo.test(titulo)){
            textoerror += "El titulo introducido no cumple con las caracteristicas necesarias.\n"
            errores = true;
        }

        //Fecha
        let fecha = document.getElementById("fech").value;
        let expfecha= new RegExp("^(([0-2][0-9]|3[0-1])/[0-12]/(19[7-9][0-9]|20[0-1][0-9]|2020))")
        if(!expfecha.test(fecha)){
            textoerror +="El formato de la fecha es incorrecto.\n";
            errores = true;
        }else{
            let dia = fecha.substring(0,2);
            let mes = fecha.substring(3,5);
            let anno = fecha.substring(6);
            let fechaDate = new Date(anno,mes-1,dia);
            let fechaHoy = new Date();
            if(fechaDate > fechaHoy){
                textoerror += "La fecha introducida no es posible.\n"
                errores = true;
            }
        }
        //Decripcion
        let descripcion = document.getElementById("descrip").value;
        if(descripcion = ""){
            textoerror +="No de puede dejar el campo Descripción vacío.\n";
            errores = true;
        }

    }
    catch (err){
        alert(textoerrores);
    }

}