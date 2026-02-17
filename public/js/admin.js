import { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } from "../services/serviceUsuarios.js";

const usuariosData = document.getElementById("usuariosData");
const sections = document.querySelectorAll(".admin-section");

// Elementos de Navegación
const btnNavMostrar = document.getElementById("btnNavMostrar");
const btnNavGestion = document.getElementById("btnNavGestion");
const btnNavAgregar = document.getElementById("btnNavAgregar");
const btnNavActualizar = document.getElementById("btnNavActualizar");
const btnNavEliminar = document.getElementById("btnNavEliminar");

// Función para cambiar de sección
function showSection(sectionId) {
    sections.forEach(s => s.style.display = "none");
    document.getElementById(sectionId).style.display = "block";

    // Actualizar botón activo
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtnId = {
        "sectionMostrar": "btnNavMostrar",
        "sectionGestion": "btnNavGestion",
        "sectionAgregar": "btnNavAgregar",
        "sectionActualizar": "btnNavActualizar",
        "sectionEliminar": "btnNavEliminar"
    }[sectionId];

    if (activeBtnId) document.getElementById(activeBtnId).classList.add("active");

    // Recargar datos si es necesario
    if (sectionId === "sectionMostrar") usuariosEnPantalla();
    if (sectionId === "sectionActualizar") cargarListaActualizar();
    if (sectionId === "sectionEliminar") cargarListaEliminar();
}

btnNavMostrar.addEventListener("click", () => showSection("sectionMostrar"));
btnNavGestion.addEventListener("click", () => showSection("sectionGestion"));
btnNavAgregar.addEventListener("click", () => showSection("sectionAgregar"));
btnNavActualizar.addEventListener("click", () => showSection("sectionActualizar"));
btnNavEliminar.addEventListener("click", () => showSection("sectionEliminar"));

// --- READ ---
async function usuariosEnPantalla() {
    try {
        const usuarios = await getUsuarios();
        usuariosData.innerHTML = "";

        if (!usuarios || usuarios.length === 0) {
            usuariosData.innerHTML = "<p class='no-data'>No hay usuarios registrados.</p>";
            return;
        }

        const table = document.createElement("table");
        table.className = "admin-table";
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cédula</th>
                    <th>Correo</th>
                </tr>
            </thead>
            <tbody></tbody>`;

        const tbody = table.querySelector("tbody");
        usuarios.forEach(usuario => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${usuario.nombreUsuario}</td>
                <td>${usuario.cedulaUsuario}</td>
                <td>${usuario.correoUsuario}</td>`;
            tbody.appendChild(tr);
        });
        usuariosData.appendChild(table);
    } catch (error) {
        console.error("Error al mostrar usuarios:", error);
        usuariosData.innerHTML = "<p class='error-msg'>Error al cargar los usuarios. Verifica la conexión.</p>";
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
        document.querySelectorAll("#sectionAgregar input").forEach(i => i.value = "");
    }
});

// --- UPDATE ---
async function cargarListaActualizar() {
    try {
        const updateList = document.getElementById("updateList");
        const usuarios = await getUsuarios();
        updateList.innerHTML = "";

        if (!usuarios || usuarios.length === 0) {
            updateList.innerHTML = "<p class='no-data'>No hay usuarios para actualizar.</p>";
            return;
        }

        document.getElementById("editForm").style.display = "none";

        const table = document.createElement("table");
        table.className = "admin-table";
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cédula</th>
                    <th>Correo</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody></tbody>`;

        const tbody = table.querySelector("tbody");
        usuarios.forEach(usuario => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${usuario.nombreUsuario}</td>
                <td>${usuario.cedulaUsuario}</td>
                <td>${usuario.correoUsuario}</td>
                <td>
                    <button class='edit-action-btn' onclick="prepararEdicionClick('${usuario.id}')">
                        <i class='fa-solid fa-user-pen'></i> Editar
                    </button>
                </td>`;
            tbody.appendChild(tr);
        });
        updateList.appendChild(table);
    } catch (error) {
        console.error("Error al cargar lista de actualización:", error);
    }
}

window.prepararEdicionClick = async (id) => {
    const usuarios = await getUsuarios();
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) prepararEdicion(usuario);
};

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
    try {
        const deleteList = document.getElementById("deleteList");
        const usuarios = await getUsuarios();
        deleteList.innerHTML = "";

        if (!usuarios || usuarios.length === 0) {
            deleteList.innerHTML = "<p class='no-data'>No hay usuarios para eliminar.</p>";
            return;
        }

        const table = document.createElement("table");
        table.className = "admin-table";
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody></tbody>`;

        const tbody = table.querySelector("tbody");
        usuarios.forEach(usuario => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${usuario.nombreUsuario}</td>
                <td>${usuario.correoUsuario}</td>
                <td>
                    <button class='delete-action-btn' onclick="eliminarUsuario('${usuario.id}')">
                        <i class='fa-solid fa-trash'></i> Eliminar
                    </button>
                </td>`;
            tbody.appendChild(tr);
        });
        deleteList.appendChild(table);
    } catch (error) {
        console.error("Error al cargar lista de eliminación:", error);
    }
}

window.eliminarUsuario = async (id) => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esta acción eliminará permanentemente al usuario!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff5252',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        const res = await deleteUsuarios(id);
        if (res) {
            Swal.fire("Eliminado", "El usuario ha sido eliminado con éxito.", "success");
            cargarListaEliminar();
        } else {
            Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
        }
    }
};

// --- CERRAR SESION ---
const cerrarSesionBtn = document.getElementById("cerrarSesionBtn");
cerrarSesionBtn.addEventListener("click", async () => {
    const result = await Swal.fire({
        title: '¿Estás seguro de cerrar sesión?',
        text: "Puedes iniciar sesión de nuevo si lo deseas.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión'
    });

    if (result.isConfirmed) {
        sessionStorage.clear();
        window.location.href = "login.html";
    }
});

// Inicio
usuariosEnPantalla();
