export function fechaValidador() {

    const year = new Date().getFullYear();

    const min = year;

    const minDate = "-01-01" + min;
    const dateInputs = document.querySelectorAll("input[type='date']");

    dateInputs.forEach(input => {

        input.setAttribute("min", minDate);

        input.addEventListener("change", function () {

            if (!this.value) return;

            const selectedYear = parseInt(this.value.split("-")[0], 10);

            if (selectedYear < min) {
                Swal.fire({
                    title: "Fecha Inválida",
                    text: "El año debe ser " + min + " o posterior.",
                    icon: "warning",
                    confirmButtonColor: "#004e92"
                });
                this.value = "";
            }
        });
    });
}
