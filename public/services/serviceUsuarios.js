
//GET 

async function getUsuarios() {
    try {
        
        const response  = await fetch("http://localhost:3001/usuarios")
        const userData = await response.json();

        return userData;

    } catch (error) {

        console.error("Error al obtener los usuarios", error)

    }
}

export {getUsuarios}

//POST 

async function postUsuarios(usuario) {
    try {
        
        const response  = await fetch("http://localhost:3001/usuarios",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(usuario) 
        })

        const userData = await response.json();

        return userData;

    } catch (error) {

        console.error("Error al obtener los usuarios", error)

    }
}

export {postUsuarios} 

<<<<<<< RamadeAndres
//DELETE

async function deleteUsuarios(id) {
    try {
        
        const response  = await fetch("http://localhost:3001/usuarios" + id,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(id) 
=======

//PUT

async function putUsuarios(id, usuario) {

    try {
        
        const response  = await fetch("http://localhost:3001/usuarios" + id,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            
            body:JSON.stringify(usuario) 
>>>>>>> main
        })

        const userData = await response.json();

        return userData;

    } catch (error) {

<<<<<<< RamadeAndres
        console.error("Error al Eliminar los usuarios", error)

    }
}

export {deleteUsuarios}  
=======
        console.error("Error al obtener los usuarios", error)

    }
}

export {putUsuarios} 
>>>>>>> main
