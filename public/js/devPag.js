//Hay que traer el get 
import { getUsuarios } from "../services/serviceUsuarios.js";

const usuariosData = document.getElementById("usuariosData");

async function usuariosEnPantalla() {
    let usuarios = await getUsuarios();

    for (let index = 0; index < usuarios.length; index++) {
        let p = document.createElement("p");
        p.textContent =

            usuarios[index].nombreUsuario + " --- " +
            usuarios[index].correoUsuario + " --- " +
            usuarios[index].cedulaUsuario + " --- " +
            usuarios[index].contraseñaUsuario;
        
        usuariosData.appendChild(p);
        
    }
}

usuariosEnPantalla();

