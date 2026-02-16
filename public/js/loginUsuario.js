import { getUsuarios } from "../services/serviceUsuarios.js";
//Intente traer la funcion obtener usuarios pero no podia me daba error 
//No me cargaba este js cargaba el de functions.js

const correoInput = document.getElementById("correoUsuario");
const contraseñaInput = document.getElementById("contraseñaUsuario");
const btnEnviarLogin = document.getElementById("btnEnviarLogin");


btnEnviarLogin.addEventListener("click", async function () {

    const usuarios = await getUsuarios(); 

    const correo = correoInput.value;
    const contraseña = contraseñaInput.value;

    let usuarioEncontrado = null;

    for (let index = 0; index < usuarios.length; index++) {
        if (
            usuarios[index].correoUsuario === correo && usuarios[index].contraseñaUsuario === contraseña) {

            usuarioEncontrado = usuarios[index];
            break;

        }
    }

    if (usuarioEncontrado) {
        alert("Login correcto", usuarioEncontrado); //FALTA EL SWEET ALERT
    } else {
        alert("Correo o contraseña incorrectas");
    }

    correoInput.value=""
    contraseñaInput.value=""
});



