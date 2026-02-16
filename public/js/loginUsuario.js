import { getUsuarios } from "../services/serviceUsuarios.js";

const correo = document.getElementById("correoUsuario");
const contraseña = document.getElementById("contraseñaUsuario");
const btnLogin = document.getElementById("btnEnviarLogin");


btnLogin.addEventListener("click", async function () {

    const respuesta = await getUsuarios();
    
    const usuarioInicio = respuesta.find(usuario => usuario.correoUsuario === correo.value && usuario.contraseñaUsuario === contraseña.value);

    if (correo.value.trim() === "" || contraseña.value.trim() === "") {
        Swal.fire({
            title: "Error",
            text: "Por favor, complete todos los campos",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    if (!respuesta) {
        Swal.fire({
            title: "Error",
            text: "No se pudo conectar con el servidor",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }
    if (correo.value === "gnaomy276@gmail.com" && contraseña.value === "12345678") {

        Swal.fire({
            title: "¡Bienvenido " + usuarioInicio.nombreUsuario + "!",
            text: "Entraste como Admin",
            icon: "success",
            confirmButtonText: "Aceptar"
        }).then(() => {
            window.location.href = "../pages/admin.html";
        });
        return;
    }

    if (usuarioInicio) {

        Swal.fire({
            title: "¡Login correcto!",
            text: "Bienvenido " + usuarioInicio.nombreUsuario,
            icon: "success",
            confirmButtonText: "Aceptar"

        }).then(() => {
            window.location.href = "../pages/home.html";
        });

        

    } else {
        
        Swal.fire({
            title: "Error",
            text: "Correo o contraseña incorrectas, por favor intente de nuevo",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }

    contraseña.value = "";
    correo.value = "";
});



