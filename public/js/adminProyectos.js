import { getProyectos, postProyecto, deleteProyecto, updateProyecto } from "../services/serviceProyectos.js";
import { initDateValidator } from "./dateValidator.js";

const formCrearProyecto = document.getElementById("formCrearProyecto");
const tablaProyectos = document.getElementById("proyectosVialesTable");

async function mostrarProyectos() {
    tablaProyectos.innerHTML = "";
    const proyectos = await getProyectos();

    if (!proyectos) return;

    proyectos.forEach(proyecto => {
        const tr = document.createElement("tr");

        const statusClass = "status-" + proyecto.estado.toLowerCase().replace(/\s+/g, '-');

        tr.innerHTML =
            "<td class='text-center'>" + proyecto.id + "</td>" +
            "<td>" + proyecto.nombre + "</td>" +
            "<td>" + proyecto.descripcion + "</td>" +
            "<td>$" + Number(proyecto.presupuesto).toLocaleString() + "</td>" +
            "<td class='text-center'>" + proyecto.fechaInicio + "</td>" +
            "<td class='text-center'>" + proyecto.fechaFin + "</td>" +
            "<td class='text-center'><span class='" + statusClass + "'>" + proyecto.estado + "</span></td>" +
            "<td class='text-center'>" +
            "<button class='btn-estado' data-id='" + proyecto.id + "'>Estado</button>" +
            "<button class='btn-eliminar' data-id='" + proyecto.id + "' style='background: #ff5252;'>Eliminar</button>" +
            "</td>";

        tablaProyectos.appendChild(tr);
    });

    // Eventos
    document.querySelectorAll(".btn-estado").forEach(btn => {
        btn.addEventListener("click", () => cambiarEstado(btn.dataset.id));
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => eliminarProyecto(btn.dataset.id));
    });
}

formCrearProyecto.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoProyecto = {
        nombre: document.getElementById("nombreProyecto").value,
        presupuesto: document.getElementById("presupuestoProyecto").value,
        fechaInicio: document.getElementById("fechaInicioProyecto").value,
        fechaFin: document.getElementById("fechaFinProyecto").value,
        descripcion: document.getElementById("descripcionProyecto").value,
        estado: "Planificado"
    };

    Swal.fire({
        title: "Creando proyecto...",
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    const res = await postProyecto(nuevoProyecto);
    if (res) {
        Swal.fire("¡Éxito!", "Proyecto creado correctamente", "success");
        formCrearProyecto.reset();
        mostrarProyectos();
    }
});

async function eliminarProyecto(id) {
    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
        const res = await deleteProyecto(id);
        if (res) {
            Swal.fire("Eliminado", "El proyecto ha sido borrado", "success");
            mostrarProyectos();
        }
    }
}

async function cambiarEstado(id) {
    const { value: nuevoEstado } = await Swal.fire({
        title: "Actualizar Estado",
        input: "select",
        inputOptions: {
            "Planificado": "Planificado",
            "En Ejecución": "En Ejecución",
            "Finalizado": "Finalizado",
            "Suspendido": "Suspendido"
        },
        inputPlaceholder: "Seleccione un estado",
        showCancelButton: true
    });

    if (nuevoEstado) {
        const res = await updateProyecto(id, { estado: nuevoEstado });
        if (res) {
            Swal.fire("Actualizado", "El estado del proyecto ha cambiado", "success");
            mostrarProyectos();
        }
    }
}

// Carga inicial
mostrarProyectos();
initDateValidator();
