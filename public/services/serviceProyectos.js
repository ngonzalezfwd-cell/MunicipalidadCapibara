const URL_PROYECTOS = "http://localhost:3001/proyectos";


async function getProyectos() {

    try {
        const response = await fetch(URL_PROYECTOS);
        if (!response.ok) throw new Error("Error fetching projects");
        return await response.json();

    } catch (error) {

        console.error("Error al obtener proyectos:", error);
    }
}

async function postProyecto(proyecto) {

    try {
        const response = await fetch(URL_PROYECTOS, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyecto)

        });

        if (!response.ok) throw new Error("Error creating project");
        return await response.json();

    } catch (error) {

        console.error("Error al crear proyecto:", error);
    }
}

async function deleteProyecto(id) {

    try {

        const response = await fetch(URL_PROYECTOS + "/" + id, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Error deleting project");
        return true;

    } catch (error) {

        console.error("Error al eliminar el proyecto " + id + ":", error);
    }
}

async function updateProyecto(id, data) {

    try {

        const response = await fetch(URL_PROYECTOS + "/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Error updating project");
        return await response.json();

    } catch (error) {
        
        console.error("Error al actualizar el proyecto " + id + ":", error);
    }
}

export { getProyectos, postProyecto, deleteProyecto, updateProyecto };
