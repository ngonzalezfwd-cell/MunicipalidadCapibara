// serviceUsuarios.js

const URL_USUARIOS = "http://localhost:3001/usuarios";


async function getUsuarios() {

    try {

        const response = await fetch(URL_USUARIOS);

        if (!response.ok) throw new Error("Error al obtener los usuarios");
        return await response.json();

    } catch (error) {

        console.error("Error al obtener los usuarios:", error);
        return null;
    }
}

async function postUsuarios(usuario) {

    try {

        const response = await fetch(URL_USUARIOS, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)

        });

        if (!response.ok) throw new Error("Error al crear el usuario");
        return await response.json();

    } catch (error) {

        console.error("Error al crear el usuario:", error);
        return null;
    }
}

async function putUsuarios(id, usuario) {

    try {

        const response = await fetch(URL_USUARIOS + id, {

            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)

        });

        if (!response.ok) throw new Error("Error al actualizar el usuario");
        return await response.json();

    } catch (error) {

        console.error("Error al actualizar el usuario:", error);
        return null;

    }
}

async function deleteUsuarios(id) {

    try {

        const response = await fetch(URL_USUARIOS + id, {

            method: "DELETE"

        });

        if (!response.ok) throw new Error("Error al eliminar el usuario");
        return true;

    } catch (error) {
        
        console.error("Error al eliminar el usuario:", error);
        return false;
    }
}

export { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios };
