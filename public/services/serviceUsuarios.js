// serviceUsuarios.js
async function getUsuarios() {
    try {
        const response = await fetch("http://localhost:3001/usuarios");
        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
}

async function postUsuarios(usuario) {
    try {
        const response = await fetch("http://localhost:3001/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        const userCreated = await response.json();
        return userCreated;
    } catch (error) {
        console.error("Error al crear el usuario", error);
    }
}

async function putUsuarios(id, usuario) {
    try {
        const response = await fetch("http://localhost:3001/usuarios/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        const userUpdated = await response.json();
        return userUpdated;
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
    }
}

async function deleteUsuarios(id) {
    try {
        const response = await fetch("http://localhost:3001/usuarios/" + id, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el usuario");
        }

        return true;
    } catch (error) {
        console.error("Error al eliminar el usuario", error);
        return false;
    }
}

export { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios };
