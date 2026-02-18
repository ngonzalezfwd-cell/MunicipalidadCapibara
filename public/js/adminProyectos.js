import { getProyectos, postProyecto, deleteProyecto, updateProyecto } from "../services/serviceProyectos.js";
import { fechaValidador } from "../services/validadorFecha.js";

const btnProyectos = document.getElementById("btnProyectos");
const tablaProyectos = document.getElementById("proyectosVialesTable");



//Mostrar proyectos

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
            "<button class='btn-editar' data-id='" + proyecto.id + "'>Editar</button>" +
            "<button class='btn-eliminar' data-id='" + proyecto.id + "' style='background: #ff5252;'>Eliminar</button>" +
            "</td>";

        tablaProyectos.appendChild(tr);
    });


    // Eventos
    document.querySelectorAll(".btn-estado").forEach(btn => {
        btn.addEventListener("click", () => cambiarEstado(btn.dataset.id));
    });

    document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", () => editarProyecto(btn.dataset.id));
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => eliminarProyecto(btn.dataset.id));
    });
}



// Función para limpiar el formulario

function limpiarFormulario() {

    document.getElementById("nombreProyecto").value = "";
    document.getElementById("presupuestoProyecto").value = "";
    document.getElementById("fechaInicioProyecto").value = "";
    document.getElementById("fechaFinProyecto").value = "";
    document.getElementById("descripcionProyecto").value = "";
}



//Crear proyecto

btnProyectos.addEventListener("click", async (e) => {

    e.preventDefault();

    const datosProyecto = {
        nombre: document.getElementById("nombreProyecto").value,
        presupuesto: document.getElementById("presupuestoProyecto").value,
        fechaInicio: document.getElementById("fechaInicioProyecto").value,
        fechaFin: document.getElementById("fechaFinProyecto").value,
        descripcion: document.getElementById("descripcionProyecto").value,
        estado: "Planificado"
    };

    if (datosProyecto.nombre.trim() === "" || datosProyecto.presupuesto.trim() === "" || datosProyecto.fechaInicio.trim() === "" || datosProyecto.fechaFin.trim() === "" || datosProyecto.descripcion.trim() === "") {
        Swal.fire("Error", "Ningun campo puede estar vacio", "error");
        return;
    }

    //Validar nombre
    if (datosProyecto.nombre.length < 3) {
        Swal.fire("Error", "El nombre debe tener al menos 3 caracteres", "error");
        return;
    }

    //Validar fechas
    if (datosProyecto.fechaInicio > datosProyecto.fechaFin) {
        Swal.fire("Error", "La fecha de inicio no puede ser mayor a la fecha final", "error");
        return;
    }

    //Validar presupuesto
    if (datosProyecto.presupuesto < 100000) {
        Swal.fire("Error", "El presupuesto debe ser mayor a 100000", "error");
        return;
    }

    //Validar descripción
    if (datosProyecto.descripcion.length < 10) {
        Swal.fire("Error", "La descripción debe tener al menos 10 caracteres", "error");
        return;
    }


    Swal.fire({
        title: "Creando proyecto...",
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    const res = await postProyecto(datosProyecto);

    if (res) {
        Swal.fire("¡Éxito!", "Proyecto creado correctamente", "success");
        limpiarFormulario();
        mostrarProyectos();
    }

});




// Editar proyecto

async function editarProyecto(id) {

    const proyectos = await getProyectos();
    const proyecto = proyectos.find(p => p.id === id);

    if (!proyecto) return;


    const { value: formValues } = await Swal.fire({

        title: "<i class='fa-solid fa-pen-to-square' style='color:#004e92'></i> Editar Proyecto",
        width: 620,
        html:
            "<div style='text-align:left; padding:0 10px;'>" +

            "<label style='font-weight:600; color:#004e92; margin-top:12px; display:block; font-size:0.95rem;'>" +
            "<i class='fa-solid fa-signature'></i> Nombre</label>" +
            "<input id='Nombre' class='swal2-input' style='width:100%; margin:5px 0 12px 0;' value='" + proyecto.nombre + "'>" +

            "<label style='font-weight:600; color:#004e92; display:block; font-size:0.95rem;'>" +
            "<i class='fa-solid fa-dollar-sign'></i> Presupuesto</label>" +
            "<input id='Presupuesto' class='swal2-input' style='width:100%; margin:5px 0 12px 0;' type='number' value='" + proyecto.presupuesto + "'>" +

            "<div style='display:grid; grid-template-columns:1fr 1fr; gap:15px;'>" +
            "<div>" +
            "<label style='font-weight:600; color:#004e92; display:block; font-size:0.95rem;'>" +
            "<i class='fa-solid fa-calendar-plus'></i> Fecha Inicio</label>" +
            "<input id='FechaInicio' class='swal2-input' style='width:100%; margin:5px 0 12px 0;' type='date' value='" + proyecto.fechaInicio + "'>" +
            "</div>" +
            "<div>" +
            "<label style='font-weight:600; color:#004e92; display:block; font-size:0.95rem;'>" +
            "<i class='fa-solid fa-calendar-check'></i> Fecha Fin</label>" +
            "<input id='FechaFin' class='swal2-input' style='width:100%; margin:5px 0 12px 0;' type='date' value='" + proyecto.fechaFin + "'>" +
            "</div>" +
            "</div>" +

            "<label style='font-weight:600; color:#004e92; display:block; font-size:0.95rem;'>" +
            "<i class='fa-solid fa-align-left'></i> Descripción</label>" +
            "<textarea id='Descripcion' class='swal2-textarea' style='width:100%; margin:5px 0 0 0;'>" + proyecto.descripcion + "</textarea>" +

            "</div>",

        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "<i class='fa-solid fa-floppy-disk'></i> Guardar Cambios",
        cancelButtonText: "<i class='fa-solid fa-xmark'></i> Cancelar",
        confirmButtonColor: "#004e92",


        preConfirm: () => {
            const nombre = document.getElementById("Nombre").value;
            const presupuesto = document.getElementById("Presupuesto").value;
            const fechaInicio = document.getElementById("FechaInicio").value;
            const fechaFin = document.getElementById("FechaFin").value;
            const descripcion = document.getElementById("Descripcion").value;

            if (nombre.trim() === "" || presupuesto.trim() === "" || fechaInicio.trim() === "" || fechaFin.trim() === "" || descripcion.trim() === "") {
                Swal.showValidationMessage("Ningun campo puede estar vacio");
                return false;
            }

            if (fechaInicio > fechaFin) {
                Swal.showValidationMessage("La fecha de inicio no puede ser mayor a la fecha final");
                return false;
            }

            // Validar que al menos un campo haya cambiado
            if (nombre === proyecto.nombre &&
                presupuesto === proyecto.presupuesto &&
                fechaInicio === proyecto.fechaInicio &&
                fechaFin === proyecto.fechaFin &&
                descripcion === proyecto.descripcion) {
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

        const res = await updateProyecto(id, formValues);

        if (res) {
            Swal.fire("¡Éxito!", "Proyecto actualizado correctamente", "success");
            mostrarProyectos();
        }
    }
}




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


mostrarProyectos();
fechaValidador();
