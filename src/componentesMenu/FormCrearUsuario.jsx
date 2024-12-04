import React, { useState } from "react";
import './MenuAdmin.css';

function FormCrearUsuario() {
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [rol, setRol] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contra, setContra] = useState('');
    const [correo, setCorreo] = useState('');
    const [edad, setEdad] = useState('');
    const [error, setError] = useState('');

    const handleCorreoChange = (e) => {
        let value = e.target.value;

        // Eliminar cualquier texto después del "@gmail.com" (si existe)
        if (value.includes('@')) {
            value = value.split('@')[0];
        }

        // Agregar automáticamente "@gmail.com" al final
        setCorreo(value + "@gmail.com");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de campos
        if (!nombre || !cedula || !rol || !usuario || !contra || !correo || !edad) {
            setError("Todos los campos son requeridos");
            return;
        }

        // Validación de correo para Gmail
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(correo)) {
            setError("Por favor ingrese un correo de Gmail");
            return;
        }

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
            // Limpiar el formulario después de la inserción exitosa
            setNombre('');
            setCedula('');
            setRol('');
            setUsuario('');
            setContra('');
            setCorreo('');
            setEdad('');
            setError('');
        })
        .catch(error => {
            console.error("Error al registrar usuario:", error);
            setError("Error al registrar usuario. Intenta de nuevo.");
        });
    };

    return (
        <div className="form-small-container">
            <h2>Registrar Usuario</h2>
            {error && <div className="error-message">{error}</div>} {/* Mensaje de error */}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingresa nombre"
                    className="inputs-Crear"
                />

                <input
                    type="number"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Ingrese Cédula"
                    className="inputs-Crear"
                />

                <div className="formCheck">
                    <div>
                        <input
                            id="checkE"
                            type="radio"
                            name="role"
                            value="Empleado"
                            checked={rol === 'Empleado'}
                            onChange={() => setRol('Empleado')}
                        />
                        <label htmlFor="checkE">Empleado</label>
                    </div>

                    <div>
                        <input
                            id="checkC"
                            type="radio"
                            name="role"
                            value="Cliente"
                            checked={rol === 'Cliente'}
                            onChange={() => setRol('Cliente')}
                        />
                        <label htmlFor="checkC">Cliente</label>
                    </div>
                </div>

                <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Ingrese Usuario"
                    className="inputs-Crear"
                />

                <input
                    type="password"
                    value={contra}
                    onChange={(e) => setContra(e.target.value)}
                    placeholder="Ingrese Contraseña"
                    className="inputs-Crear"
                />

                <div className="correo-container">
                    <input
                        type="text"
                        value={correo.split('@')[0]} // Mostrar solo la parte antes de "@gmail.com"
                        onChange={handleCorreoChange} // Usa la función personalizada
                        placeholder="Ingrese Correo"
                        className="inputs-Crear correo-input"
                    />
                    <span className="gmail-suffix">@gmail.com</span> {/* Parte fija del correo */}
                </div>

                <input
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    placeholder="Ingrese Edad"
                    className="inputs-Crear"
                />

                <button type="submit" className="btn-crear-usuario">Agregar Usuario</button>
            </form>
        </div>
    );
}

export default FormCrearUsuario;
