import { getReportes, getReporteById, updateReporteStatus } from "../services/serviceReportes.js";

const reportesData = document.getElementById("reportesData");

async function mostrarReportes() {
    reportesData.innerHTML = "";
    const reportes = await getReportes();

    if (!reportes) return;

    reportes.forEach(reporte => {
        const tr = document.createElement("tr");

        const statusClass = "status-" + reporte.estado.toLowerCase().replace(/\s+/g, '-');

        tr.innerHTML =
            "<td>" + reporte.id + "</td>" +
            "<td>" + reporte.titulo + "</td>" +
            "<td>" + (reporte.tipo || 'General') + "</td>" +
            "<td class='text-center'><span class='" + statusClass + "'>" + reporte.estado + "</span></td>" +
            "<td class='text-center'>" + reporte.fecha + "</td>" +
            "<td class='text-center'>" +
            "<button class='btn-ver' data-id='" + reporte.id + "'>Ver Detalle</button>" +
            "<button class='btn-estado' data-id='" + reporte.id + "'>Cambiar Estado</button>" +
            "</td>";

        reportesData.appendChild(tr);
    });

    // Agregar eventos a los botones
    document.querySelectorAll(".btn-ver").forEach(btn => {
        btn.addEventListener("click", () => verDetalle(btn.dataset.id));
    });

    document.querySelectorAll(".btn-estado").forEach(btn => {
        btn.addEventListener("click", () => cambiarEstado(btn.dataset.id));
    });
}

async function verDetalle(id) {
    const reporte = await getReporteById(id);
    if (!reporte) return;

    Swal.fire({
        title: reporte.titulo,
        html:
            "<div style='text-align: left;'>" +
            "<p><strong>Tipo:</strong> " + (reporte.tipo || 'General') + "</p>" +
            "<p><strong>Descripción:</strong> " + reporte.descripcion + "</p>" +
            "<p><strong>Ubicación:</strong> " + (reporte.ubicacion || 'No especificada') + "</p>" +
            "<p><strong>Estado:</strong> <span class='status-" + reporte.estado.toLowerCase().replace(/\s+/g, '-') + "'>" + reporte.estado + "</span></p>" +
            "<p><strong>Fecha:</strong> " + reporte.fecha + "</p>" +
            "</div>",
        icon: "info",
        confirmButtonText: "Cerrar"
    });
}

function cambiarEstado(id) {
    Swal.fire({
        title: "Actualizar Estado",
        input: "select",
        inputOptions: {
            "Pendiente": "Pendiente",
            "En Proceso": "En Proceso",
            "Resuelto": "Resuelto"
        },
        inputPlaceholder: "Seleccione un nuevo estado",
        showCancelButton: true,
        confirmButtonText: "Actualizar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
            if (!value) {
                return "Debes seleccionar un estado";
            }
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            await updateReporteStatus(id, result.value);
            Swal.fire("¡Actualizado!", "El reporte ahora está en estado: " + result.value, "success");
            mostrarReportes();
        }
    });
}

// Inicializar la vista
mostrarReportes();

