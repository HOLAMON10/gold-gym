import React, { useState, useEffect } from 'react';
import './MenuAdmin.css';
import NavigationMenu from "../Components/NavigationMenuEmpAdmin";
import FormCrearUsuario from "./FormCrearUsuario";


function MenuAdmin() {
    const [clientes, setClientes] = useState([]);
    const [empleados, setEmpleados] = useState([]);

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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No hay empleados disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br/>
            <FormCrearUsuario/>
            

            
        </div>
        </div>
    );
}

export default MenuAdmin;
