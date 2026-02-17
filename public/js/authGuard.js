// authGuard.js
(function () {
    const isAdmin = sessionStorage.getItem("isAdmin");
    const userRole = sessionStorage.getItem("userRole");

    // Check if the current page is an admin page
    const isAdminPage = window.location.pathname.includes("admin.html") ||
        window.location.pathname.includes("gestionReportes.html") ||
        window.location.pathname.includes("proyectosViales.html") ||
        window.location.pathname.includes("serviciosPublicos.html");

    if (isAdminPage) {
        if (isAdmin !== "true" || userRole !== "admin") {
            alert("Acceso denegado. Se requiere perfil de administrador.");
            window.location.href = "login.html";
        }
    }
})();
