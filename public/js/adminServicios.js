import { getServicios, postServicio, deleteServicio, updateServicio } from "../services/serviceServicios.js";
import { initDateValidator } from "./dateValidator.js";

const formCrearServicio = document.getElementById("formCrearServicio");
const tablaServicios = document.getElementById("serviciosPublicosTable");
const inputBuscar = document.getElementById("buscarServicio");

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

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => eliminarServicio(btn.dataset.id));
    });
}

// Filtro de búsqueda
inputBuscar.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtrados = allServicios.filter(s => 
        s.nombre.toLowerCase().includes(term) || 
        s.descripcion.toLowerCase().includes(term)
    );
    renderTabla(filtrados);
});

async function verDetalle(id) {
    const servicio = allServicios.find(s => s.id == id);
    if (!servicio) return;

    Swal.fire({
        title: servicio.nombre,
        html: `
            <div style="text-align: left;">
                <p><strong>Descripción:</strong> ${servicio.descripcion}</p>
                <p><strong>Presupuesto:</strong> $${Number(servicio.presupuesto).toLocaleString()}</p>
                <p><strong>Fecha Inicio:</strong> ${servicio.fechaInicio}</p>
                <p><strong>Fecha Fin:</strong> ${servicio.fechaFin}</p>
                <p><strong>Estado:</strong> <span class="status-${servicio.estado.toLowerCase().replace(/\s+/g, '-')}">${servicio.estado}</span></p>
            </div>
        `,
        icon: "info",
        confirmButtonText: "Cerrar"
    });
}

formCrearServicio.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoServicio = {
        nombre: document.getElementById("nombreServicio").value,
        presupuesto: document.getElementById("presupuestoServicio").value,
        fechaInicio: document.getElementById("fechaInicioServicio").value,
        fechaFin: document.getElementById("fechaFinServicio").value,
        descripcion: document.getElementById("descripcionServicio").value,
        estado: "Planificado"
    };

    Swal.fire({
        title: "Creando servicio...",
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    const res = await postServicio(nuevoServicio);
    if (res) {
        Swal.fire("¡Éxito!", "Servicio creado correctamente", "success");
        formCrearServicio.reset();
        mostrarServicios();
    }
});

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
initDateValidator();

