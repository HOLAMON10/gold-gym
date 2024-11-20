import React, { useState, useEffect } from 'react';
import './MenuAdmin.css';
import NavigationMenu from "../Components/NavigationMenu";
import FormCrearUsuario from "./FormCrearUsuario";


function MenuAdmin() {
    const [clientes, setClientes] = useState([]);
    

    // Obtener los datos de los clientes
    useEffect(() => {
        fetch('http://localhost:5000/verClientes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Verifica qué datos se reciben
                if (data && data.data) {
                    setClientes(data.data);  // Asigna los datos de los clientes
                } else {
                    console.log("No se encontró la propiedad 'data' en la respuesta de clientes");
                }
            })
            .catch(error => console.error('Error al obtener datos de clientes:', error));
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
                    setClientes(prevEmpleados => prevEmpleados.filter(item => item.id !== id));
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
            <br />
            <h2 style={{ color: 'Black', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Clientes</h2>
            <table id="clientes">
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
                    {clientes.length > 0 ? (
                        clientes.map(cliente => (
                            <tr key={cliente.id}>
                               
                                <td>{cliente.nombre}</td>
                                <td>{cliente.cedula}</td>
                                <td>{cliente.rol}</td>
                                <td>{cliente.usuario}</td>
                                <td>{cliente.correo}</td>
                                <td>{cliente.edad}</td>
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
                                            onClick={() => handleEliminarUsuario(cliente.id)} // Llamada a la función de eliminación
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                              
                                
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No hay clientes disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br />
            
            <br/>
            <FormCrearUsuario/>
            

            
        </div>
        </div>
    );
}

export default MenuAdmin;
