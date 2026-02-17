/* homeSession.js */
(function () {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const userRole = sessionStorage.getItem("userRole");
    const navLinks = document.querySelector(".nav-links");
    const ctaGroup = document.querySelector(".cta-group");

    if (isLoggedIn) {

        // Actualizar links de navegación
        navLinks.innerHTML =
            "<span class='user-greeting'><i class='fa-solid fa-circle-user'></i> Hola, " + (userRole === 'admin' ? 'Admin' : 'Ciudadano') + "</span>" +
            (userRole === 'user' ? "<a href='../pages/misReportes.html' class='nav-btn'><i class='fa-solid fa-list-check'></i> Mis Reportes</a>" : "") +
            "<button id='btnCerrarSesion' class='nav-btn logout'>Cerrar Sesión</button>";

            
        // Evento de cerrar sesión
        document.getElementById("btnCerrarSesion").addEventListener("click", () => {
            Swal.fire({
                title: '¿Cerrar sesión?',
                text: "Tendrás que ingresar de nuevo para realizar reportes.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, salir'
            }).then((result) => {
                if (result.isConfirmed) {
                    sessionStorage.clear();
                    window.location.reload();
                }
            });
        });
    }

    // Manejar clic en "Realizar Reporte" si no está logueado
    const btnReporte = document.querySelector('a[href*="usuarioReporte.html"]');
    if (btnReporte && !isLoggedIn) {
        btnReporte.addEventListener("click", (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'Sesión requerida',
                text: "Debes iniciar sesión para poder enviar un reporte.",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#004e92',
                confirmButtonText: 'Ir al Login',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../pages/login.html";
                }
            });
        });
    }

    // Manejar clic en "Panel Admin" para validación de rol
    const btnAdmin = document.querySelector('a[href*="admin.html"]');
    if (btnAdmin) {
        btnAdmin.addEventListener("click", (e) => {
            if (!isLoggedIn) {
                e.preventDefault();
                Swal.fire({
                    title: 'Acceso Restringido',
                    text: "Por favor, inicia sesión como administrador para acceder al panel.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#004e92',
                    confirmButtonText: 'Ir al Login',
                    cancelButtonText: 'Cerrar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "../pages/login.html";
                    }
                });
            } else if (userRole !== "admin") {
                e.preventDefault();
                Swal.fire({
                    title: 'Acceso Denegado',
                    text: "Esta sección es exclusiva para el personal administrativo.",
                    icon: 'error',
                    confirmButtonColor: '#004e92',
                    confirmButtonText: 'Entendido'
                });
            }
        });
    }
})();
