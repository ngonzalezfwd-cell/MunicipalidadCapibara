// authGuard.js
(function () {
    const isAdmin = sessionStorage.getItem("isAdmin");
    const userRole = sessionStorage.getItem("userRole");
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    const path = window.location.pathname;

    // Páginas que cualquier usuario logueado puede ver
    const isUserPage = path.includes("usuarioReporte.html");

    // Páginas que solo el admin puede ver
    const isAdminPage = path.includes("admin.html") ||
        path.includes("gestionReportes.html") ||
        path.includes("proyectosViales.html") ||
        path.includes("serviciosPublicos.html");

    if (isAdminPage) {
        if (isAdmin !== "true" || userRole !== "admin") {
            alert("Acceso denegado. Se requiere perfil de administrador.");
            window.location.href = "login.html";
        }
    } else if (isUserPage) {
        if (!isLoggedIn) {
            alert("Acceso restringido. Por favor, inicia sesión para realizar un reporte.");
            window.location.href = "login.html";
        }
    }
})();
