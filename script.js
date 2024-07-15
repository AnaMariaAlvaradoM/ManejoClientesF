const baseURL = "http://localhost:9090/api/clientes";

document.getElementById("btnCrear").addEventListener("click", function(event) {
    event.preventDefault();
    enviarPeticion('post');
});

document.getElementById("btnActualizar").addEventListener("click", function(event) {
    event.preventDefault();
    enviarPeticion('put');
});

document.getElementById("btnEliminar").addEventListener("click", function(event) {
    event.preventDefault();
    enviarPeticion('delete');
});

document.getElementById("btnTraerTodos").addEventListener("click", function(event) {
    event.preventDefault();
    traerTodosClientes();
});

async function enviarPeticion(metodo) {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;

    const cliente = {
        nombre: nombre,
        apellido: apellido,
        email: email
    };

    try {
        let response;
        if (metodo === 'post') {
            response = await fetch(`${baseURL}/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
        } else if (metodo === 'put') {
            const id = prompt("Ingrese el ID del cliente a actualizar:");
            response = await fetch(`${baseURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
        } else if (metodo === 'delete') {
            const id = prompt("Ingrese el ID del cliente a eliminar:");
            response = await fetch(`${baseURL}/${id}`, {
                method: 'DELETE'
            });
        }

        if (!response.ok) {
            throw new Error('Error en la solicitud.');
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        alert("Operación realizada exitosamente!");

    document.getElementById("myForm").reset();

    } catch (error) {
        console.error("Error al realizar la operación:", error);
        alert("Error al realizar la operación. Por favor, revise los datos ingresados o el ID proporcionado.");
    }
}

async function traerTodosClientes() {
    try {
        const response = await fetch(`${baseURL}/todos`);
        if (!response.ok) {
            throw new Error('Error en la solicitud.');
        }

        const data = await response.json();
        console.log("Todos los clientes:", data);
        alert("Clientes obtenidos correctamente. Revisa la consola para ver los detalles.");
    } catch (error) {
        console.error("Error al obtener todos los clientes:", error);
        alert("Error al obtener todos los clientes. Verifica la consola para más detalles.");
    }
}
