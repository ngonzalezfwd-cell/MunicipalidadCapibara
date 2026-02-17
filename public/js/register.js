import { postUsuarios, getUsuarios } from "../services/serviceUsuarios.js";

const nombre = document.getElementById("nombreUsuario");
const correo = document.getElementById("correoUsuario");
const contraseña = document.getElementById("contraseñaUsuario");
const cedula = document.getElementById("cedulaUsuario");
const btnEnviar = document.getElementById("btnEnviarUsuario");


btnEnviar.addEventListener("click", async function () {

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

    const usuariosExistentes = await getUsuarios();
    const existe = usuariosExistentes.some(u => u.correoUsuario === correo.value || u.cedulaUsuario === cedula.value);

    if (existe) {
        Swal.fire({
            title: "Usuario ya registrado",
            text: "El correo o la cédula ya están en uso.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    const respuesta = await postUsuarios(usuarioCrear);

    if (respuesta) {
        Swal.fire({
            title: "¡Usuario creado!",
            text: "¡Bienvenido " + usuarioCrear.nombreUsuario + "!",
            icon: "success",
            confirmButtonText: "Aceptar"
        }).then(() => {
            window.location.href = "../pages/login.html";
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "No se pudo crear el usuario. Verifique la conexión con el servidor.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }
});
