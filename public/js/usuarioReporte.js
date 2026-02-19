/* usuarioReporte.js */
import { postReporte } from "../services/serviceReportes.js";

const btnEnviar = document.getElementById("submit-btn");

btnEnviar.addEventListener("click", async function (e) {

    e.preventDefault();

    const tipo = document.getElementById("tipoReporte").value;
    const titulo = document.getElementById("tituloReporte").value;
    const descripcion = document.getElementById("descripcionReporte").value;
    const ubicacion = document.getElementById("ubicacionReporte").value;

    if (!tipo || !titulo || !descripcion || !ubicacion || tipo.trim() === "" || titulo.trim() === "" || descripcion.trim() === "" || ubicacion.trim() === "") {

        Swal.fire({
            title: "Campos vacíos",
            text: "Por favor, no deje campos vacíos.",
            icon: "warning",
            confirmButtonText: "Entendido",
            confirmButtonColor: "#004e92"
        });

        return;
    }

    const nuevoReporte = {

        userId: sessionStorage.getItem("userId"),
        titulo: titulo,
        tipo: tipo,
        descripcion: descripcion,
        ubicacion: ubicacion,
        estado: "Pendiente",
        fecha: new Date().toLocaleDateString()
    };

    Swal.fire({
        title: "Enviando reporte...",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {

        const resultado = await postReporte(nuevoReporte);

        if (resultado) {

            Swal.fire({
                title: "¡Reporte Enviado!",
                text: "Tu reporte ha sido registrado con éxito. El equipo de la municipalidad lo revisará pronto.",
                icon: "success",
                confirmButtonColor: "#004e92"

            }).then(() => {

                window.location.href = "home.html";
            });

        } else {

            throw new Error("Error en la respuesta del servidor");
        }

    } catch (error) {

        Swal.fire({
            title: "Error",
            text: "No se pudo enviar el reporte. Por favor, intenta de nuevo más tarde.",
            icon: "error",
            confirmButtonColor: "#ff5252"
        });
    }
});
