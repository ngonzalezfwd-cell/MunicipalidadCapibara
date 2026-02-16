import { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } from "../services/serviceUsuarios.js";


const usuariosData = document.getElementById("usuariosData");
const sections = document.querySelectorAll(".admin-section");

// Elementos de Navegación
const btnNavMostrar = document.getElementById("btnNavMostrar");
const btnNavAgregar = document.getElementById("btnNavAgregar");
const btnNavActualizar = document.getElementById("btnNavActualizar");
const btnNavEliminar = document.getElementById("btnNavEliminar");

// Función para cambiar de sección
function showSection(sectionId) {
    sections.forEach(s => s.style.display = "none");
    document.getElementById(sectionId).style.display = "block";

    // Recargar datos si es necesario
    if (sectionId === "sectionMostrar") usuariosEnPantalla();
    if (sectionId === "sectionActualizar") cargarListaActualizar();
    if (sectionId === "sectionEliminar") cargarListaEliminar();
}

btnNavMostrar.addEventListener("click", () => showSection("sectionMostrar"));
btnNavAgregar.addEventListener("click", () => showSection("sectionAgregar"));
btnNavActualizar.addEventListener("click", () => showSection("sectionActualizar"));
btnNavEliminar.addEventListener("click", () => showSection("sectionEliminar"));

// --- READ ---
async function usuariosEnPantalla() {
    try {
        const usuarios = await getUsuarios();
        usuariosData.innerHTML = "";
        usuarios.forEach(usuario => {
            const p = document.createElement("p");
            p.className = "user-item";
            p.textContent = `Nombre: ${usuario.nombreUsuario} - Cédula: ${usuario.cedulaUsuario} - Correo: ${usuario.correoUsuario}`;
            usuariosData.appendChild(p);
        });
    } catch (error) {
        console.error("Error al mostrar usuarios:", error);
    }
}

// --- CREATE ---
const btnGuardarUsuario = document.getElementById("btnGuardarUsuario");
btnGuardarUsuario.addEventListener("click", async () => {
    const nuevoUsuario = {
        nombreUsuario: document.getElementById("addNombre").value,
        correoUsuario: document.getElementById("addCorreo").value,
        cedulaUsuario: document.getElementById("addCedula").value,
        contraseñaUsuario: document.getElementById("addPass").value
    };

    if (Object.values(nuevoUsuario).some(v => v === "")) {
        Swal.fire("Error", "Todos los campos son obligatorios", "error");
        return;
    }

    const res = await postUsuarios(nuevoUsuario);
    if (res) {
        Swal.fire("Éxito", "Usuario agregado correctamente", "success");
        showSection("sectionMostrar");
        // Limpiar
        document.querySelectorAll("#sectionAgregar input").forEach(i => i.value = "");
    }
});

// --- UPDATE ---

async function cargarListaActualizar() {

    const updateList = document.getElementById("updateList");
    const usuarios = await getUsuarios();
    updateList.innerHTML = "";

    usuarios.forEach(usuario => {
        const p = document.createElement("p");
        p.className = "user-item";
        p.textContent = "Nombre: " + usuario.nombreUsuario + " - " + "Cédula: " + usuario.cedulaUsuario + " - " + "Correo: " + usuario.correoUsuario;
        updateList.appendChild(p);
        const btn = document.createElement("button");
        btn.textContent = "Editar";
        btn.onclick = () => prepararEdicion(usuario);
        updateList.appendChild(btn);
    });
}

function prepararEdicion(usuario) {

    document.getElementById("editForm").style.display = "block";
    document.getElementById("editId").value = usuario.id;
    document.getElementById("editNombre").value = usuario.nombreUsuario;
    document.getElementById("editCorreo").value = usuario.correoUsuario;
    document.getElementById("editCedula").value = usuario.cedulaUsuario;
    document.getElementById("editPass").value = usuario.contraseñaUsuario;
}

document.getElementById("btnConfirmarActualizar").onclick = async () => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar'
    });

    if (result.isConfirmed) {
        const id = document.getElementById("editId").value;
        const usuarioEditado = {
            nombreUsuario: document.getElementById("editNombre").value,
            correoUsuario: document.getElementById("editCorreo").value,
            cedulaUsuario: document.getElementById("editCedula").value,
            contraseñaUsuario: document.getElementById("editPass").value
        };

        const res = await putUsuarios(id, usuarioEditado);
        if (res) {
            Swal.fire("Éxito", "Usuario actualizado", "success");
            showSection("sectionMostrar");
        }
    }
};

// --- DELETE ---

async function cargarListaEliminar() {

    const deleteList = document.getElementById("deleteList");
    const usuarios = await getUsuarios();
    deleteList.innerHTML = "";

    usuarios.forEach(usuario => {

        const div = document.createElement("div");

        div.innerHTML =
            "<span>" + usuario.nombreUsuario + "</span>" +
            "<button onclick=\"eliminarUsuario('" + usuario.id + "')\">Eliminar</button>";
        deleteList.appendChild(div);
    });
}


window.eliminarUsuario = async (id) => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
    });

    if (result.isConfirmed) {

        const res = await deleteUsuarios(id);
        if (res) {
            Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
            showSection("sectionMostrar");
        }
    }
};

// Inicio
usuariosEnPantalla();





