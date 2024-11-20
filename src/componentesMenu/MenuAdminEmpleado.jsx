import React, { useState, useEffect } from 'react';
import './MenuAdmin.css';
import NavigationMenu from "../Components/NavigationMenu";
import FormCrearUsuario from "./FormCrearUsuario";

function MenuAdminEmpleado() {
    const [empleados, setEmpleados] = useState([]);

    // Obtener los datos de los empleados
    useEffect(() => {
        fetch('http://localhost:5000/verEmpleados', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Verifica qué datos se reciben
                if (data && data.data) {
                    setEmpleados(data.data);  // Asigna los datos de los empleados
                } else {
                    console.log("No se encontró la propiedad 'data' en la respuesta de empleados");
                }
            })
            .catch(error => console.error('Error al obtener datos de empleados:', error));
    }, []);

    const handleEliminarUsuario = (id) => {
        fetch(`http://localhost:5000/api/eliminarUsuario/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message); // Mensaje de éxito
                    // Actualizar el estado de los empleados
                    setEmpleados(prevEmpleados => prevEmpleados.filter(item => item.id !== id));
                } else {
                    alert(data.error); // Mensaje de error
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al eliminar el empleado');
            });
    };

    return (
        <div>
            <NavigationMenu />
            <div id="menu-admin-container">
                <h2 style={{ color: 'Black', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Empleados</h2>
                <table id="empleados">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Tipo Usuario</th>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Edad</th>
                            <th></th>
                            <th></th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.length > 0 ? (
                            empleados.map(empleado => (
                                <tr key={empleado.id}>
                                    <td>{empleado.nombre}</td>
                                    <td>{empleado.cedula}</td>
                                    <td>{empleado.rol}</td>
                                    <td>{empleado.usuario}</td>
                                    <td>{empleado.correo}</td>
                                    <td>{empleado.edad}</td>
                                    <td>
                                        <button
                                            style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                                            onClick={() => handleEliminarUsuario(empleado.id)} // Llamada a la función de eliminación
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay empleados disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <br />
                <FormCrearUsuario />
            </div>
        </div>
    );
}

export default MenuAdminEmpleado;
