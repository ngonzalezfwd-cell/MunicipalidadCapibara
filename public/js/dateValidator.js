/**
 * dateValidator.js
 * Centraliza la lógica para prevenir fechas pasadas en los inputs.
 */

export function initDateValidator() {
    const minYear = 2026;
    const minDate = `${minYear}-01-01`;
    const dateInputs = document.querySelectorAll("input[type='date']");

    dateInputs.forEach(input => {
        // Establecer el atributo min para permitir fechas desde el inicio del año 2026
        input.setAttribute("min", minDate);

        // Validación extra al cambiar el valor
        input.addEventListener("change", function () {
            if (!this.value) return;

            const selectedYear = parseInt(this.value.split("-")[0], 10);

            if (selectedYear < minYear) {
                Swal.fire({
                    title: "Fecha Inválida",
                    text: `El año debe ser ${minYear} o posterior.`,
                    icon: "warning",
                    confirmButtonColor: "#004e92"
                });
                this.value = "";
            }
        });
    });
}
