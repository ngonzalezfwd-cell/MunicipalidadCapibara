import { deleteUsuarios, getUsuarios } from "../services/serviceUsuarios.js";

const usuariosData = document.getElementById("usuariosData");

async function mostrarUsuariosPantalla() {

    usuariosData.innerHTML = ""; // Limpia la pantalla antes de volver a pintar

    let usuarios = await getUsuarios();
    console.log(usuarios);

    for (let index = 0; index < usuarios.length; index++) {

        let contenedor = document.createElement("div");

        let h3 = document.createElement("h3");
        let btnEditar = document.createElement("button");
        let btnEliminar = document.createElement("button");

        btnEditar.textContent = "Editar";
        btnEliminar.textContent = "Eliminar";

        h3.textContent =
            usuarios[index].nombreUsuario + " --- " +
            usuarios[index].correoUsuario + " --- " +
            usuarios[index].cedulaUsuario;

        contenedor.appendChild(h3);
        contenedor.appendChild(btnEditar);
        contenedor.appendChild(btnEliminar);

        usuariosData.appendChild(contenedor);

        // EVENTO ELIMINAR
        btnEliminar.addEventListener("click", async function () {

            await deleteUsuarios(usuarios[index].id);

            // Volver a pintar la lista actualizada
            mostrarUsuariosPantalla();
        });

        // EVENTO EDITAR
        btnEditar.addEventListener("click", function () {

            console.log("Editar usuario con id:", usuarios[index].id);

            // Aquí puedes redirigir o cargar datos en un formulario
        });
    }
}

mostrarUsuariosPantalla();

