
//GET 

async function getUsuarios() {

    try {

        const response = await fetch("http://localhost:3001/usuarios")
        const userData = await response.json();

        return userData;

    } catch (error) {

        console.error("Error al obtener los usuarios", error)

    }
}

export { getUsuarios }

//POST 

async function postUsuarios(usuario) {
    try {

        const response = await fetch("http://localhost:3001/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })

        const userData = await response.json();

        return userData;

    } catch (error) {

        console.error("Error al obtener los usuarios", error)

    }
}

export { postUsuarios }

//PUT

async function putUsuarios(id, usuario) {
    try {

        const response = await fetch("http://localhost:3001/usuarios/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })

        const userData = await response.json();

        return userData;

    } catch (error) {

        console.error("Error al actualizar los usuarios", error)

    }
}

export { putUsuarios }

//DELETE

async function deleteUsuarios(id) {
    try {

        const response = await fetch("http://localhost:3001/usuarios/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        })

        const userData = await response.json();

        return userData;

    } catch (error) {

        console.error("Error al Eliminar los usuarios", error)

    }
}

export { deleteUsuarios }  


//GET Proyectos

async function getProyectos() {
    try {

        const respuesta = await fetch("http://localhost:3001/proyectosViales")
        const proyectosData = await respuesta.json();

        return proyectosData; //CAMBIA el NMB 

    } catch (error) {

        console.error("Error al obtener los usuarios", error)

    }
}

export {getProyectos}

//POST Proyectos

async function postProyectos(proyecto) {
        try {

        const respuesta = await fetch("http://localhost:3001/proyectosViales",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(proyecto)
        })
        const proyectosData = await respuesta.json();

        return proyectosData; //CAMBIA el NMB 

    } catch (error) {

        console.error("Error al obtener los usuarios", error)

    }
}

export{postProyectos}

//PUT Proyectos
async function putProyectos(id, proyecto) {
    try {
        const respuesta = await fetch("http://localhost:3001/proyectosViales/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyecto)
        })
        const proyectosData = await respuesta.json();
        return proyectosData;
    } catch (error) {
        console.error("Error al actualizar los proyectos", error)
    }
}
export { putProyectos }

//DELETE Proyectos
async function deleteProyectos(id) {
    try {
        const respuesta = await fetch("http://localhost:3001/proyectosViales/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        })
        const proyectosData = await respuesta.json();
        return proyectosData;
    } catch (error) {
        console.error("Error al eliminar los proyectos", error)
    }
}
export { deleteProyectos }


