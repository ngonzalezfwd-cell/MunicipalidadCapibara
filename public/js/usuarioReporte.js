/* usuarioReporte.js */
import { postReporte } from "../services/serviceReportes.js";

document.getElementById("formUsuarioReporte").addEventListener("submit", async function (e) {
    e.preventDefault();

    const tipo = document.getElementById("tipoReporte").value;
    const titulo = document.getElementById("tituloReporte").value;
    const descripcion = document.getElementById("descripcionReporte").value;
    const ubicacion = document.getElementById("ubicacionReporte").value;

    if (!tipo || !titulo || !descripcion || !ubicacion) {
        Swal.fire({
            title: "Campos incompletos",
            text: "Por favor, completa todos los campos del formulario.",
            icon: "warning",
            confirmButtonColor: "#004e92"
        });
        return;
    }

    const nuevoReporte = {
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
