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
        <div className="form-small-container">
            <h2>Registrar Usuario</h2>
            <input
                type="text"
                id="nombreRegistro"
                placeholder="Ingresa nombre"
                className="inputs-Crear"
            />

            <input
                type="number"
                id="cedulaRegistro"
                placeholder="Ingrese Cédula"
                className="inputs-Crear"
            />

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

            <input
                type="text"
                id="registroUsuario"
                placeholder="Ingrese Usuario"
                className="inputs-Crear"
            />

            <input
                type="password"
                id="contra"
                placeholder="Ingrese Contraseña"
                className="inputs-Crear"
            />

            <input
                type="email"
                id="correo"
                placeholder="Ingrese Correo"
                className="inputs-Crear"
            />

            <input
                type="number"
                id="edad"
                placeholder="Ingrese Edad"
                className="inputs-Crear"
            />

            <button onClick={Agregarclic} className="btn-crear-usuario">Agregar Usuario</button>
        </div>
    );
}


export default FormCrearUsuario;
