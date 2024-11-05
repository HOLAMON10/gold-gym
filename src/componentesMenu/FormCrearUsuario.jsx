import React from "react";
import './MenuAdmin.css';

function FormCrearUsuario() {

    const Agregarclic = () => {
        const nombre = document.getElementById("nombreRegistro").value;
        const cedula = document.getElementById("cedulaRegistro").value;
         // Agarra el rol seleccionado
         const rol = document.querySelector('input[name="role"]:checked')?.value;
         if (!rol) {
             alert("Por favor selecciona un rol (Empleado o Cliente)");
             return; 
         }
        const usuario = document.getElementById("registroUsuario").value; 
        const contra = document.getElementById("contra").value;
        const correo = document.getElementById("correo").value;
        const edad = document.getElementById("edad").value;

       

        // Crear el objeto con los datos del formulario
        const data = {
            nombre,
            cedula,
            rol,
            usuario,
            contra,
            correo,
            edad
             
        };

        // Hacer la petición al backend
        fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert("Usuario registrado exitosamente");
        })
        .catch(error => {
            console.error("Error al registrar usuario:", error);
        });
    };

    return (
        <div>
            <input
                type="text"
                id="nombreRegistro"
                placeholder="Ingresa nombre"
                className="inputs-Crear"  
            />

            <br />
            <br />

            <input
                type="number"
                id="cedulaRegistro"
                placeholder="Ingrese Cedula"
                className="inputs-Crear"  
            />
            <br />
            <br />

            <form className="formCheck">
                <div>
                    <input id="checkE" type="radio" name="role" value="Empleado" />
                    <label htmlFor="checkE">Empleado</label>
                </div>

                <div>
                    <input id="checkC" type="radio" name="role" value="Cliente" />
                    <label htmlFor="checkC">Cliente</label>
                </div>
            </form>
            <br />

            <input
                type="text"
                id="registroUsuario"
                placeholder="Ingrese Usuario"
                className="inputs-Crear"  
            />
            <br />
            <br />

            <input
                type="text"
                id="contra"
                placeholder="Ingrese password"
                className="inputs-Crear"  
            />
            <br />
            <br />

            <input
                type="text"
                id="correo"
                placeholder="Ingrese correo"
                className="inputs-Crear"  
            />
            <br />
            <br />

            <input
                type="number"
                id="edad"
                placeholder="Ingrese edad"
                className="inputs-Crear"  
            />
            <br />
            <br />

            <button onClick={Agregarclic}>Agregar Usuario</button>

            <div>
                {/* Aquí puedes agregar más contenido si lo deseas */}
            </div>
        </div>
    );
}

export default FormCrearUsuario;
