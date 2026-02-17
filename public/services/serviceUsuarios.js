
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


//DELETE

async function deleteUsuarios(id) {
    try {
        
        const response  = await fetch("http://localhost:3001/usuarios" + id,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(id) 
        })

    }catch (error) {
        console.error("Error al obtener los usuarios", error)


    } 
}

export {deleteUsuarios}  


//PUT

async function putUsuarios(id, usuario) {

    try {
        
        const response  = await fetch("http://localhost:3001/usuarios" + id,{
            method: "PUT",
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
        

export {putUsuarios} 

