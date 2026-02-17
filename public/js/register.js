import {postUsuarios} from "../services/serviceUsuarios.js";

const nombre = document.getElementById("nombreUsuario");
const correo = document.getElementById("correoUsuario");
const contraseña = document.getElementById("contraseñaUsuario");
const cedula = document.getElementById("cedulaUsuario");
const btnEnviar = document.getElementById("btnEnviarUsuario");


btnEnviar.addEventListener("click", async function() {
    
    if (nombre.value.trim() === "" || correo.value.trim() === "" || contraseña.value.trim() === "" || cedula.value.trim() === "") {

        Swal.fire({
            title: "Error",
            text: "Por favor, complete todos los campos",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    if (!correo.value.includes("@") || !correo.value.includes(".")) {

        Swal.fire({
            title: "Error",
            text: "Por favor, coloque un correo válido",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }

   
    if (cedula.value.trim().length !== 9) {

        Swal.fire({
            title: "Error",
            text: "Coloque una cédula válida (9 dígitos)",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    if (contraseña.value.length < 8) {

        Swal.fire({
            title: "Error",
            text: "La contraseña debe tener al menos 8 caracteres",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }


    const usuarioCrear = {
        nombreUsuario: nombre.value,
        correoUsuario: correo.value,
        contraseñaUsuario: contraseña.value,
        cedulaUsuario: cedula.value
    };

    const Respuesta = await postUsuarios(usuarioCrear);


    if (Respuesta) {
        Swal.fire({
            title: "¡Usuario creado!",
            text: "¡Bienvenido " + usuarioCrear.nombreUsuario + "!",
            icon: "success",
            confirmButtonText: "Aceptar"
        });

        window.location.href = "../pages/login.html";
      
        nombre.value = "";
        correo.value = "";
        contraseña.value = "";
        cedula.value = "";

    } else {
        Swal.fire({
            
            title: "Error",
            text: "No se pudo crear el usuario. Verifique la conexión con el servidor.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }
});



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
