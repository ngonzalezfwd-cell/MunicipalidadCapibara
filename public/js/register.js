import {getUsuarios, postUsuarios} from "../services/serviceUsuarios.js";

const nombreUsuario = document.getElementById("nombreUsuario");
const correoUsuario = document.getElementById("correoUsuario");
const contraseñaUsuario = document.getElementById("contraseñaUsuario");
const cedulaUsuario = document.getElementById("cedulaUsuario");
const btnEnviarUsuario = document.getElementById("btnEnviarUsuario");


btnEnviarUsuario.addEventListener("click", async function() {
    
    const usuario ={

        nombreUsuario: nombreUsuario.value,
        correoUsuario: correoUsuario.value,
        contraseñaUsuario: contraseñaUsuario.value,
        cedulaUsuario: cedulaUsuario.value

    }
    
    //COMENTAR DSP
    let usuarioGuardado = await postUsuarios(usuario)
    console.log(usuarioGuardado)

    alert("creaste el usuario")//CREAR EL SWEET ALERT

    window.location.href = "../pages/login.html"; //

    //DSP de crear el usuario los datos se quedan en blanco
    nombreUsuario.value= ""
    correoUsuario.value=""
    contraseñaUsuario.value=""
    cedulaUsuario.value=""
})


//Trae la funcion de serviceUsuarios GET
async function obtenerUsuarios() {
    
    const usariosObtenidos = await getUsuarios();
    return usariosObtenidos;//RECORDAR RETORNAR LA PROMESA

}
export {obtenerUsuarios}


//OBTIENE LOS USUARIOS

//usuariosData
//Rederizar los datos en pantalla

// async function usuariosEnPantalla() {
//     let usuariosFinales= await obtenerUsuarios();
    
//     for (let index = 0; index < usuariosFinales.length; index++) {
//         //console.log(usuariosFinales[index].nombreUsuario);
        
//         let p = document.createElement("p");
//         p.textContent = usuariosFinales[index].nombreUsuario;
//         usuariosData.appendChild(p);
//     }
// }

// usuariosEnPantalla();
