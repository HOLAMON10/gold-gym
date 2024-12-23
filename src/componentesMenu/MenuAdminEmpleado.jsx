import React, { useState, useEffect } from 'react';
import './MenuAdmin.css';
import NavigationMenu from "../Components/NavigationMenuEmpAdmin";
import FormCrearUsuario from "./FormCrearUsuario";

function MenuAdminEmpleado() {
    const [empleados, setEmpleados] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);  // Controlar si mostrar o no la ventana emergente
    const [SelectedUsuario, setSelectedUsuario] = useState(null);  // Guardar el ejercicio seleccionado para editar
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
   
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [edad, setEdad] = useState('');


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



    
    // Función para abrir el popup y cargar los datos del ejercicio seleccionado
    const handleEditarUsuario = (empleado) => {
        setSelectedUsuario(empleado);
        setNombre(empleado.nombre);  // Cargar los datos actuales del ejercicio
        setCedula(empleado.cedula);
        
        setUsuario(empleado.usuario);
        setCorreo(empleado.correo);
        setEdad(empleado.edad);
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
                    setEmpleados(prevEmpleados => prevEmpleados.map(ej => ej.id === SelectedUsuario.id ? { ...ej, nombre: nombre, cedula,usuario,correo,edad } : ej));
                    
                } else {
                    alert(data.error);
                }
            })
            .catch(error => {
                console.error('Error al actualizar el ejercicio:', error);
                alert('Hubo un error al actualizar el ejercicio');
            });
    };






    return (
        <div className="bg-[#292929] min-h-screen"
        style={{
          backgroundColor: '#292929',
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '10px 10px',
        }}>
            <NavigationMenu />
            <div id="menu-admin-container">
                <h2 style={{ color: 'white', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Empleados</h2>
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
                                            onClick={() => handleEditarUsuario(empleado)}
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

export default MenuAdminEmpleado;
