import { getProyectos, postProyectos, putProyectos, deleteProyectos } from "../services/serviceUsuarios.js";

const nombreProyecto = document.getElementById("NombreProyecto");
const DescripcionProyecto = document.getElementById("DescripcionProyecto");
const PresupuestoProyecto = document.getElementById("PresupuestoProyecto");
const FechaProyecto = document.getElementById("FechaProyecto");
const EstadoProyecto = document.getElementById("EstadoProyecto");
const btnProyectos = document.getElementById("btnProyectos");
const proyectosData = document.getElementById("proyectosData");

let idEditando = null; // guardamos el id del proyecto que se está editando

btnProyectos.addEventListener("click", async function () {
    const proyecto = {
        nombreProyecto: nombreProyecto.value,
        DescripcionProyecto: DescripcionProyecto.value,
        PresupuestoProyecto: PresupuestoProyecto.value,
        FechaProyecto: FechaProyecto.value,
        EstadoProyecto: EstadoProyecto.value
    };

    if (idEditando !== null) {
        // si hay un id guardado, editamos
        await putProyectos(idEditando, proyecto);
        idEditando = null;
        btnProyectos.textContent = "Guardar Proyecto";
    } else {
        // si no hay id, creamos
        await postProyectos(proyecto);
    }

    limpiarInputs();
    mostrarProyectos();
});

function limpiarInputs() {
    nombreProyecto.value = "";
    DescripcionProyecto.value = "";
    PresupuestoProyecto.value = "";
    FechaProyecto.value = "";
    EstadoProyecto.value = "";
}

async function obtenerProyectos() {
    const proyectosObtenidos = await getProyectos();
    return proyectosObtenidos;
}

async function mostrarProyectos() {
    let proyectosFinales = await obtenerProyectos();
    proyectosData.innerHTML = "";

    for (let index = 0; index < proyectosFinales.length; index++) {
        const proyecto = proyectosFinales[index];

        // contenedor por proyecto
        let div = document.createElement("div");
        div.style.marginBottom = "10px";

        // nombre del proyecto
        let p = document.createElement("p");
        p.textContent = proyecto.nombreProyecto;

        // boton editar
        let btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", function () {
            editarProyecto(proyecto);
        });

        // boton eliminar
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", async function () {
            await eliminarProyecto(proyecto.id);
        });

        div.appendChild(p);
        div.appendChild(btnEditar);
        div.appendChild(btnEliminar);
        proyectosData.appendChild(div);
    }
}

function editarProyecto(proyecto) {
    // llenamos los inputs con los datos del proyecto seleccionado
    nombreProyecto.value = proyecto.nombreProyecto;
    DescripcionProyecto.value = proyecto.DescripcionProyecto;
    PresupuestoProyecto.value = proyecto.PresupuestoProyecto;
    FechaProyecto.value = proyecto.FechaProyecto;
    EstadoProyecto.value = proyecto.EstadoProyecto;

    // guardamos el id para saber que estamos editando
    idEditando = proyecto.id;
    btnProyectos.textContent = "Actualizar Proyecto";
}

async function eliminarProyecto(id) {
    const confirmar = confirm("¿Estás seguro de que deseas eliminar este proyecto?");
    if (confirmar) {
        await deleteProyectos(id);
        mostrarProyectos();
    }
}

mostrarProyectos();
