import { getServicios, postServicio, deleteServicio, updateServicio } from "../services/serviceServicios.js";
import { fechaValidador } from "../services/validadorFecha.js";

const CrearServicio = document.getElementById("CrearServicio");
const btnServicio = document.getElementById("BtnServicio");
const tablaServicios = document.getElementById("serviciosPublicosTable");



let allServicios = []; // Para almacenar todos los servicios y filtrar localmente

async function mostrarServicios() {

    const servicios = await getServicios();
    if (!servicios) return;

    allServicios = servicios;
    renderTabla(allServicios);
}


function renderTabla(servicios) {

    tablaServicios.innerHTML = "";

    servicios.forEach(servicio => {

        const tr = document.createElement("tr");

        const statusClass = "status-" + servicio.estado.toLowerCase().replace(/\s+/g, '-');

        tr.innerHTML =
            "<td class='text-center'>" + servicio.id + "</td>" +
            "<td>" + servicio.nombre + "</td>" +
            "<td>" + (servicio.descripcion.length > 50 ? servicio.descripcion.substring(0, 50) + "..." : servicio.descripcion) + "</td>" +
            "<td>$" + Number(servicio.presupuesto).toLocaleString() + "</td>" +
            "<td class='text-center'>" + servicio.fechaInicio + "</td>" +
            "<td class='text-center'>" + servicio.fechaFin + "</td>" +
            "<td class='text-center'><span class='" + statusClass + "'>" + servicio.estado + "</span></td>" +
            "<td class='text-center'>" +
            "<button class='btn-ver' data-id='" + servicio.id + "'>Detalle</button>" +
            "<button class='btn-estado' data-id='" + servicio.id + "'>Estado</button>" +
            "<button class='btn-editar' data-id='" + servicio.id + "'>Editar</button>" +
            "<button class='btn-eliminar' data-id='" + servicio.id + "'>Eliminar</button>" +
            "</td>";

        tablaServicios.appendChild(tr);
    });

    // Eventos
    document.querySelectorAll(".btn-ver").forEach(btn => {
        btn.addEventListener("click", () => verDetalle(btn.dataset.id));
    });

    document.querySelectorAll(".btn-estado").forEach(btn => {
        btn.addEventListener("click", () => cambiarEstado(btn.dataset.id));
    });

    document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", () => editarServicio(btn.dataset.id));
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => eliminarServicio(btn.dataset.id));
    });
}



async function verDetalle(id) {

    const servicio = allServicios.find(s => s.id == id);

    if (!servicio) return;

    Swal.fire({
        title: servicio.nombre,
        html:

            "<div style='text-align: left;'>" +
            "<p><strong>Descripción:</strong>" + servicio.descripcion + "</p>" +
            "<p><strong>Presupuesto:</strong>" + Number(servicio.presupuesto).toLocaleString() + "</p>" +
            "<p><strong>Fecha Inicio:</strong>" + servicio.fechaInicio + "</p>" +
            "<p><strong>Fecha Fin:</strong>" + servicio.fechaFin + "</p>" +
            "<p><strong>Estado:</strong>" + servicio.estado + "</p>" +
            "</div>"
        ,
        icon: "info",
        confirmButtonText: "Cerrar"
    });
}

btnServicio.addEventListener("click", async (e) => {

    e.preventDefault();

    const nuevoServicio = {
        nombre: document.getElementById("nombreServicio").value,
        presupuesto: document.getElementById("presupuestoServicio").value,
        fechaInicio: document.getElementById("fechaInicioServicio").value,
        fechaFin: document.getElementById("fechaFinServicio").value,
        descripcion: document.getElementById("descripcionServicio").value,
        estado: "Planificado"
    };

    if (nuevoServicio.nombre.trim() === "" || nuevoServicio.presupuesto.trim() === "" || nuevoServicio.fechaInicio.trim() === "" || nuevoServicio.fechaFin.trim() === "" || nuevoServicio.descripcion.trim() === "") {
        Swal.fire("Error", "Todos los campos son obligatorios", "error");
        return;
    }

    if (nuevoServicio.fechaInicio > nuevoServicio.fechaFin) {
        Swal.fire("Error", "La fecha de inicio no puede ser mayor a la fecha final", "error");
        return;
    }

    Swal.fire({
        title: "Creando servicio...",
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });


    const res = await postServicio(nuevoServicio);
    if (res) {
        Swal.fire("¡Éxito!", "Servicio creado correctamente", "success");
        document.getElementById("nombreServicio").value = "";
        document.getElementById("presupuestoServicio").value = "";
        document.getElementById("fechaInicioServicio").value = "";
        document.getElementById("fechaFinServicio").value = "";
        document.getElementById("descripcionServicio").value = "";
        mostrarServicios();
    }
});


// --- EDITAR SERVICIO ---

async function editarServicio(id) {

    const servicio = allServicios.find(s => s.id == id);
    if (!servicio) return;

    const { value: formValues } = await Swal.fire({

        title: "<i class='fa-solid fa-pen-to-square' style='color:#004e92'></i> Editar Servicio",
        width: 620,
        html:
            "<div style='text-align:left; padding:0 10px;'>" +

            "<label style='font-weight:600; color:#004e92; margin-top:12px; display:block; font-size:0.95rem;'>" +
            "<i class='fa-solid fa-signature'></i> Nombre</label>" +
            "<input id='editNombre' class='swal2-input' style='width:100%; margin:5px 0 12px 0;' value='" + servicio.nombre + "'>" +

            "<label style='font-weight:600; color:#004e92; display:block; font-size:0.95rem;'>" +
            "<i class='fa-solid fa-dollar-sign'></i> Presupuesto</label>" +
            "<input id='editPresupuesto' class='swal2-input' style='width:100%; margin:5px 0 12px 0;' type='number' value='" + servicio.presupuesto + "'>" +

            "<div style='display:grid; grid-template-columns:1fr 1fr; gap:15px;'>" +
            "<div>" +
            "<label style='font-weight:600; color:#004e92; display:block; font-size:0.95rem;'>" +
            "<i class='fa-solid fa-calendar-plus'></i> Fecha Inicio</label>" +
            "<input id='editFechaInicio' class='swal2-input' style='width:100%; margin:5px 0 12px 0;' type='date' value='" + servicio.fechaInicio + "'>" +
            "</div>" +
            "<div>" +
            "<label style='font-weight:600; color:#004e92; display:block; font-size:0.95rem;'>" +
            "<i class='fa-solid fa-calendar-check'></i> Fecha Fin</label>" +
            "<input id='editFechaFin' class='swal2-input' style='width:100%; margin:5px 0 12px 0;' type='date' value='" + servicio.fechaFin + "'>" +
            "</div>" +
            "</div>" +

            "<label style='font-weight:600; color:#004e92; display:block; font-size:0.95rem;'>" +
            "<i class='fa-solid fa-align-left'></i> Descripción</label>" +
            "<textarea id='editDescripcion' class='swal2-textarea' style='width:100%; margin:5px 0 0 0;'>" + servicio.descripcion + "</textarea>" +

            "</div>",

        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "<i class='fa-solid fa-floppy-disk'></i> Guardar Cambios",
        cancelButtonText: "<i class='fa-solid fa-xmark'></i> Cancelar",
        confirmButtonColor: "#004e92",

        preConfirm: () => {
            const nombre = document.getElementById("editNombre").value;
            const presupuesto = document.getElementById("editPresupuesto").value;
            const fechaInicio = document.getElementById("editFechaInicio").value;
            const fechaFin = document.getElementById("editFechaFin").value;
            const descripcion = document.getElementById("editDescripcion").value;

            if (nombre.trim() === "" || presupuesto.trim() === "" || fechaInicio.trim() === "" || fechaFin.trim() === "" || descripcion.trim() === "") {
                Swal.showValidationMessage("Ningún campo puede estar vacío");
                return false;
            }

            if (fechaInicio > fechaFin) {
                Swal.showValidationMessage("La fecha de inicio no puede ser mayor a la fecha final");
                return false;
            }

            if (nombre === servicio.nombre &&
                presupuesto === servicio.presupuesto &&
                fechaInicio === servicio.fechaInicio &&
                fechaFin === servicio.fechaFin &&
                descripcion === servicio.descripcion) {
                Swal.showValidationMessage("No se realizaron cambios en los datos");
                return false;
            }

            return {
                nombre: nombre,
                presupuesto: presupuesto,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                descripcion: descripcion
            };
        }
    });

    if (formValues) {
        const res = await updateServicio(id, formValues);
        if (res) {
            Swal.fire("¡Éxito!", "Servicio actualizado correctamente", "success");
            mostrarServicios();
        }
    }
}

async function eliminarServicio(id) {
    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
        const res = await deleteServicio(id);
        if (res) {
            Swal.fire("Eliminado", "El servicio ha sido borrado", "success");
            mostrarServicios();
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
        const res = await updateServicio(id, { estado: nuevoEstado });
        if (res) {
            Swal.fire("Actualizado", "El estado del servicio ha cambiado", "success");
            mostrarServicios();
        }
    }
}

// Inicialización
mostrarServicios();
fechaValidador();
