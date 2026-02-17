/**
 * dateValidator.js
 * Centraliza la lógica para prevenir fechas pasadas en los inputs.
 */

export function initDateValidator() {
    const today = new Date().toISOString().split("T")[0];
    const dateInputs = document.querySelectorAll("input[type='date']");

    dateInputs.forEach(input => {
        // Establecer el atributo min para bloquear fechas pasadas en el calendario del navegador
        input.setAttribute("min", today);

        // Validación extra al cambiar el valor (por si pegan una fecha o usan un navegador antiguo)
        input.addEventListener("change", function () {
            if (this.value < today && this.value !== "") {
                Swal.fire({
                    title: "Fecha Inválida",
                    text: "No puedes seleccionar una fecha pasada.",
                    icon: "warning",
                    confirmButtonColor: "#004e92"
                });
                this.value = "";
            }
        });
    });
}
