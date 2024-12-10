import React, { useState, useEffect } from 'react';
import './MenuAdmin.css';
import FormCrearUsuario from "./FormCrearUsuario";
import NavBar from '../Components/NavigationMenuEmpAdmin';


function MenuAdmin() {
    const [clientes, setClientes] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);  // Controlar si mostrar o no la ventana emergente
    const [SelectedUsuario, setSelectedUsuario] = useState(null);  // Guardar el ejercicio seleccionado para editar
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [contra, setContra] = useState('');
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [edad, setEdad] = useState('');

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





    // Función para abrir el popup y cargar los datos del ejercicio seleccionado
    const handleEditarUsuario = (cliente) => {
        setSelectedUsuario(cliente);
        setNombre(cliente.nombre);  // Cargar los datos actuales del ejercicio
        setCedula(cliente.cedula);
        setContra(cliente.contra);
        setUsuario(cliente.usuario);
        setCorreo(cliente.correo);
        setEdad(cliente.edad);
        setShowEditPopup(true);  // Mostrar la ventana emergente
    };



    // Función para cerrar el popup
    const handleClosePopup = () => {
        setShowEditPopup(false);
        setSelectedUsuario(null);
    };



    // Función para enviar las actualizaciones al servidor
    const handleActualizarUsuario = () => {
        fetch(`http://localhost:5000/api/actualizarUsuario/${SelectedUsuario.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                cedula,

                usuario,
                correo,
                edad

            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert('Usuario actualizado correctamente');
                    setShowEditPopup(false);  // Cerrar el popup
                    // Actualizar la tabla de ejercicios con los nuevos datos
                    setClientes(prevClientes => prevClientes.map(ej => ej.id === SelectedUsuario.id ? { ...ej, nombre: nombre, cedula, usuario, correo, edad } : ej));

                } else {
                    alert(data.error);
                }
            })
            .catch(error => {
                console.error('Error al actualizar el ejercicio:', error);
                alert('Hubo un error al actualizar el ejercicio');
            });
    };


    const handleActualizarSuscripcion = (id) => {
        fetch(`http://localhost:5000/api/actualizarSuscripcion/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                estado: 'Aprobado',
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert('Suscripción actualizada correctamente');
                    setClientes(prevClientes =>
                        prevClientes.map(cliente =>
                            cliente.id === id ? { ...cliente, estado: 'Aprobado' } : cliente
                        )
                    );
                } else {
                    alert(data.error);
                }
            })
            .catch(error => {
                console.error('Error al actualizar la suscripción:', error);
                alert('Hubo un error al actualizar la suscripción');
            });
    };





    return (
        <div className="bg-[#292929] min-h-screen"
        style={{
          backgroundColor: '#292929',
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '10px 10px',
        }}>
            <NavBar />
            <div id="menu-admin-container">
                <br />
                <h2 style={{ color: 'white', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Clientes</h2>
                <table id="clientes">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            
                            <th>Usuario</th>
                            <th>Contraseña</th>
                            <th>Correo</th>
                            <th>Edad</th>
                            <th></th>
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
                                
                                    <td>{cliente.usuario}</td>
                                    <td>{cliente.contra}</td>
                                    <td>{cliente.correo}</td>
                                    <td>{cliente.edad}</td>
                                    <td>
                                        <button
                                            style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                                            onClick={() => handleEditarUsuario(cliente)}
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
                                    <td>
                                        <button
                                            style={{ backgroundColor: '#000080', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                                            onClick={() => handleActualizarSuscripcion(cliente.id)}
                                        >
                                            Actualizar suscripción
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

                <br />
                <FormCrearUsuario />
                {/* Ventana emergente de edición */}
                {showEditPopup && (
                    <div className="popup-overlay">
                        <div className="popup-container">
                            <h3>Editar Usuario</h3>
                            <div>
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="cedula">cedula</label>
                                <input
                                    type="number"
                                    id="cedula"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="usuario">usuario</label>
                                <input
                                    type="text"
                                    id="usuario"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="correo">correo</label>
                                <input
                                    type="text"
                                    id="correo"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="edad">edad</label>
                                <input
                                    type="number"
                                    id="edad"
                                    value={edad}
                                    onChange={(e) => setEdad(e.target.value)}
                                />
                            </div>
                            <div>
                                <button
                                    className="popup-button update"
                                    onClick={handleActualizarUsuario}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className="popup-button cancel"
                                    onClick={handleClosePopup}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}




            </div>
        </div>
    );
}

export default MenuAdmin;
