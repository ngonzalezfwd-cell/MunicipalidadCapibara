const URL_SERVICIOS = "http://localhost:3001/servicios";

async function getServicios() {
    try {
        const response = await fetch(URL_SERVICIOS);
        if (!response.ok) throw new Error("Error fetching services");
        return await response.json();
    } catch (error) {
        console.error("Error al obtener servicios:", error);
    }
}

async function postServicio(servicio) {
    try {
        const response = await fetch(URL_SERVICIOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servicio)
        });
        if (!response.ok) throw new Error("Error creating service");
        return await response.json();
    } catch (error) {
        console.error("Error al crear servicio:", error);
    }
}

async function deleteServicio(id) {
    try {
        const response = await fetch(URL_SERVICIOS + "/" + id, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Error deleting service");
        return true;
    } catch (error) {
        console.error("Error al eliminar el servicio " + id + ":", error);
    }
}

async function updateServicio(id, data) {
    try {
        const response = await fetch(URL_SERVICIOS + "/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Error updating service");
        return await response.json();
    } catch (error) {
        console.error("Error al actualizar el servicio " + id + ":", error);
    }
}

export { getServicios, postServicio, deleteServicio, updateServicio };
