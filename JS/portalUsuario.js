var usuarios = [];

function usuadmin()
{
    if (usuarios.length == 0)
    {
        let u = new Usuario("equipo3","12345Abcde","Equipo3","Reto1","00000000A");
        usuarios.push(u);
        localStorage.setItem('datos',JSON.stringify(usuarios));
    }
}

function acceder(){
    var datosusu = JSON.parse(localStorage.getItem("datos"));

    let usu = document.getElementById("usu").value;
    let expusu = new RegExp("^[A-Za-z0-9]*$");
    let cont = document.getElementById("contra").value;
    let expcon = new RegExp("^[A-Za-z0-9]{8,}$");

    try
    {
        if (usu === "" || cont === "")
            throw "ERROR: Campos Obligatorios";
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
                    if (datosusu[x].contra === cont)
                        location.href = "./principal.html";
                    else
                       throw "ERROR: Usuario o contraseña incorrectas";
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
