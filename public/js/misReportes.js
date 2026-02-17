import { getReportes } from "../services/serviceReportes.js";

const misReportesData = document.getElementById("misReportesData");
const noReportsMessage = document.getElementById("noReportsMessage");

async function cargarMisReportes() {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
        Swal.fire({
            title: "Sesión no válida",
            text: "Por favor, inicia sesión de nuevo.",
            icon: "error"
        }).then(() => {
            window.location.href = "login.html";
        });
        return;
    }

    const allReportes = await getReportes();
    if (!allReportes) return;

    // Filtrar reportes por el ID del usuario actual
    const misReportes = allReportes.filter(reporte => String(reporte.userId) === String(userId));

    if (misReportes.length === 0) {
        noReportsMessage.style.display = "block";
        return;
    }

    noReportsMessage.style.display = "none";
    misReportesData.innerHTML = "";

    misReportes.forEach(reporte => {
        const tr = document.createElement("tr");
        const statusClass = "status-" + reporte.estado.toLowerCase().replace(/\s+/g, '-');

        tr.innerHTML =
            "<td class='text-center'>" + reporte.id + "</td>" +
            "<td>" + reporte.titulo + "</td>" +
            "<td>" + (reporte.tipo || 'General') + "</td>" +
            "<td class='text-center'><span class='" + statusClass + "'>" + reporte.estado + "</span></td>" +
            "<td class='text-center'>" + reporte.fecha + "</td>";

        misReportesData.appendChild(tr);
    });
}

// Inicializar
cargarMisReportes();
