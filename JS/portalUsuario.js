
function usuadmin(){
    let datosusu = JSON.parse(localStorage.getItem("datos"));
    if (datosusu == null){
        var usuarios = []
        let u = new Usuario("equipo3","12345Abcde","Equipo3","Reto1","00000000A");
        usuarios.push(u);
        localStorage.setItem('datos',JSON.stringify(usuarios));
    }
}

function acceder(){
    let datosusu = JSON.parse(localStorage.getItem("datos"));

    let usu = document.getElementById("usu").value;
    let expusu = new RegExp("^[A-Za-z0-9]*$");
    let cont = document.getElementById("contra").value;
    let expcon = new RegExp("^[A-Za-z0-9]{8,}$");

    try
    {
        if (usu === "" || cont === "")
            throw "ERROR: Campos Obligatorios"
        else
        {
            if (expusu.test(usu) && expcon.test(cont))
            {
                let x;
                for (x = 0; x < datosusu.length && datosusu[x].usuario !== usu; x++){}
                if (x === datosusu.length)
                    throw "ERROR: Usuario o contraseña incorrectas";
                else
                {
                    if (datosusu[x].contra === cont){
                        localStorageUsuarioActivado(datosusu[x].nombre)
                        location.href = "./principal.html";
                    }
                    else{
                        throw "ERROR: Usuario o contraseña incorrectas";
                    }

                }
            }
            else
                throw "ERROR: Formato de usuario y contraseña erroneo";
        }
    }
    catch (err)
    {
        alert(err);
    }
}




function localStorageUsuarioActivado(nombre) {
    localStorage.setItem('datosConectado',JSON.stringify(nombre));
}



function cerrarSesion(){
    localStorage.removeItem('datosConectado');
    location.href="./index.html";

}

function anadirusu(){
    mostraryocultar("crear_usuario","borrar_usuario","modificar_usuario","lista_usuarios","crear_aviso","borrar_anuncio","modificar_aviso","tablonAnuncios");
    borrar();
}

function borrarusu(){
    mostraryocultar("borrar_usuario","crear_usuario","modificar_usuario","lista_usuarios","crear_aviso","borrar_anuncio","modificar_aviso","tablonAnuncios");
    borrar();
}

function modificarusu(){
    mostraryocultar("modificar_usuario","crear_usuario","borrar_usuario","lista_usuarios","crear_aviso","borrar_anuncio","modificar_aviso","tablonAnuncios");
    borrar();
}

function listausu(){
    mostraryocultar("lista_usuarios","crear_usuario","borrar_usuario","modificar_usuario","crear_aviso","borrar_anuncio","modificar_aviso","tablonAnuncios");
    listarUsuarios()
    borrar();
}

function anadiraviso(){
    mostraryocultar("crear_aviso","crear_usuario","borrar_usuario","lista_usuarios","modificar_usuario","borrar_anuncio","modificar_aviso","tablonAnuncios");
    borrar();
}

function borraraviso(){
    mostraryocultar("borrar_anuncio","crear_aviso","crear_usuario","lista_usuarios","borrar_usuario","modificar_usuario","modificar_aviso","tablonAnuncios");
    borrar();
}

function modaviso(){
    mostraryocultar("modificar_aviso","crear_usuario","borrar_usuario","modificar_usuario","lista_usuarios","crear_aviso","borrar_anuncio","tablonAnuncios");
    borrar();
}

function tablon(){
    mostraryocultar("tablonAnuncios","crear_usuario","borrar_usuario","modificar_usuario","lista_usuarios","crear_aviso","borrar_anuncio","modificar_aviso");
    borrar();
}

function mostraryocultar(a1,a2,a3,a4,a5,a6,a7,a8){
    document.getElementById(a1).style.display="flex";
    let variables = [a2,a3,a4,a5,a6,a7,a8];
    for (let i in variables)
    {
        document.getElementById(variables[i]).style.display="none";
    }
}

function borrarCampos() {
    document.getElementById("user").value = ""
    document.getElementById("contraseña").value = ""
    document.getElementById("Nombre").value = ""
    document.getElementById("apellido").value = ""
    document.getElementById("dni").value = ""

}

function borrar(){
    borrarCampos();
    borrardatosaviso();
}

function borrardatosaviso(){
    let avi = ["tit","fech","descrip","buscar_aviso","borrar_anun","title","date","label_descripcion","desc"];
    for (let x in avi)
        document.getElementById(avi[x]).value = "";
}

function annadirUsuario() {
    //Primero comprobamos que los datos sean correctos
    let usuarios2 = JSON.parse(localStorage.getItem("datos"));
    let errores = comprobacionesTodosCampos("Nombre","apellido","dni","user","contraseña")

    if (!errores){
        try {
            //Introducimos los datos
            let user = document.getElementById("user").value
            let password = document.getElementById("contraseña").value
            let name = document.getElementById("Nombre").value
            let surname = document.getElementById("apellido").value
            let dni = document.getElementById("dni").value

            let u = new Usuario(user,password,name,surname,dni);
            usuarios2.push(u);
            localStorage.setItem('datos',JSON.stringify(usuarios2));
            alert("Usuario "+user+" insertado.")
            borrarCampos()

        }catch (err){
            alert("Error introduciendo usuarios")
        }
    }


}

function comprobacionesTodosCampos(nombre2,apellido2,dni2,user2,password2){
    let textoErrores = "No has introducido los siguientes campos bien: "
    let errores = false
    try {


        //Nombre
        let nombre = document.getElementById(nombre2).value
        let expNombre = new RegExp("^([A-Za-z]*[ ]?)+$");
        if (!expNombre.test(nombre)){
            textoErrores += " nombre "
            errores = true
        }

        //Apellido
        let apellido = document.getElementById(apellido2).value
        let expApellido = new RegExp("^([A-Za-z]*[ ]?)+$");
        if (!expApellido.test(apellido)){
            textoErrores += " apellido "
            errores = true
        }

        //DNI
        let dni = document.getElementById(dni2).value
        let expDni = new RegExp("^[0-9]{8,8}[A-Za-z]$");
        let dniSinLetra = ""
        for (let i = 0; i < (dni.length - 1); i++) {
            dniSinLetra += dni.charAt(i)
        }
        let comprobacionDni = parseInt(dniSinLetra) % 23
        let letrasDNI = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T']
        if (!expDni.test(dni) || !(letrasDNI[comprobacionDni].toUpperCase() == dni.charAt(8).toUpperCase())){
            textoErrores += " DNI "
            errores = true
        }

        //Usuario
        let usuario = document.getElementById(user2).value;
        let expUsuario = new RegExp("^[A-Za-z0-9]*$");
        if (!expUsuario.test(usuario)){
            textoErrores += " usuario "
            errores = true
        }

        //Contraseña
        let password = document.getElementById(password2).value;
        let expPassword = new RegExp("^[A-Za-z0-9]{8,}$");
        if (!expPassword.test(password)){
            textoErrores += " contraseña "
            errores = true
        }

        //Cuando encuentra errores
        if (errores){
            throw textoErrores


        }

        return errores

    }catch (err){
        alert(err)
        return errores

    }


}


function borrarUsuario() {
    try{

        let datosUsu = JSON.parse(localStorage.getItem("datos"));


        let user = document.getElementById("borrar").value
        let i
        for (i = 0; i < datosUsu.length && !(user == datosUsu[i].usuario); i++) {

        }
        if (i == datosUsu.length){
            borrarCampos()
            throw "Usuario no encontrado, prueba a introducir otro usuario"
        }else {
            datosUsu.splice(i,1)
            localStorage.setItem('datos',JSON.stringify(datosUsu));
            alert("Usuario "+user+" eliminado")
            borrarCampos()
        }

    }catch (err){
        alert(err)
    }

}
function buscarUsuario(){
    try{

        let datosUsu = JSON.parse(localStorage.getItem("datos"));


        let user = document.getElementById("buscar_usuario").value

        let i
        for (i = 0; i < datosUsu.length && !(user == datosUsu[i].usuario); i++) {

        }
        if (i == datosUsu.length){
            borrarCampos()
            throw "Usuario no encontrado, prueba a introducir otro usuario"
        }else {
            let div = document.getElementById("mod_usu")
            div.style.display = "flex";
            let div2 = document.getElementById("button-buscar-usuario")
            div2.style.display = "none";
            document.getElementById("name").value = datosUsu[i].nombre
            document.getElementById("surname").value = datosUsu[i].apellido
            document.getElementById("credencial").value = datosUsu[i].dni
            document.getElementById("pass").value = datosUsu[i].contra

           // return i
        }


    }catch (err){
        alert(err)
    }
}
function modificarUsuario() {
    try{

        let datosUsu = JSON.parse(localStorage.getItem("datos"));
        let user = document.getElementById("buscar_usuario").value
        let i
        for (i = 0; i < datosUsu.length && !(user == datosUsu[i].usuario); i++)

            if (i == datosUsu.length){
                borrarCampos()
                throw "Usuario no encontrado, prueba a introducir otro usuario"
            }
        let fallos = comprobacionesTodosCampos("name","surname","credencial","buscar_usuario","pass")
        if (!fallos){
            datosUsu[i].nombre = document.getElementById("name").value
            datosUsu[i].apellido = document.getElementById("surname").value
            datosUsu[i].dni = document.getElementById("credencial").value
            datosUsu[i].usuario = document.getElementById("buscar_usuario").value
            datosUsu[i].contra = document.getElementById("pass").value


            localStorage.setItem('datos',JSON.stringify(datosUsu));


            alert("Usuario "+datosUsu[i].usuario+" modificado.")
            let div = document.getElementById("mod_usu")
            div.style.display = "none";
            let div2 = document.getElementById("button-buscar-usuario")
            div2.style.display = "flex";
        }



    }catch (err){
        alert(err)
    }

}

function listarUsuarios(){
    try {
        let datosUsu = JSON.parse(localStorage.getItem("datos"));

        let texto = ""
        for (let i = 0; i < datosUsu.length; i++) {
            let nombre = datosUsu[i].nombre
            texto += "Nombre: "+nombre+"\n"
            let apellido = datosUsu[i].apellido
            texto += "Apellido : "+apellido+"\n"
            let dni = datosUsu[i].dni
            texto += "DNI: "+dni+"\n"
            let user = datosUsu[i].usuario
            texto += "Usuario: "+user+"\n"
            //let password = datosUsu[i].contra
            //texto += "Contraseña: "+password+"\n"
            texto += "\n"
        }

        //alert(texto)
        document.getElementById("descripcion").value = texto



    }catch (err){
        alert("Error listando usuarios")
    }

}






