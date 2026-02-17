const URL_REPORTE = "http://localhost:3001/reportes";

async function getReportes() {
    try {
        const response = await fetch(URL_REPORTE);
        if (!response.ok) throw new Error("Error fetching reports");
        return await response.json();
    } catch (error) {
        console.error("Error al obtener reportes:", error);
    }
}

async function getReporteById(id) {
    try {
        const response = await fetch(`${URL_REPORTE}/${id}`);
        if (!response.ok) throw new Error("Error fetching report details");
        return await response.json();
    } catch (error) {
        console.error(`Error al obtener el reporte con ID ${id}:`, error);
    }
}

async function updateReporteStatus(id, newStatus) {
    try {
        const response = await fetch(`${URL_REPORTE}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ estado: newStatus })
        });
        if (!response.ok) throw new Error("Error updating report status");
        return await response.json();
    } catch (error) {
        console.error(`Error al actualizar el estado del reporte ${id}:`, error);
    }
}

export { getReportes, getReporteById, updateReporteStatus };
