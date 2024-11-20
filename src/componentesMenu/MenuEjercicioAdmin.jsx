import React, { useState, useEffect } from 'react';
import './MenuAdmin.css';
import NavigationMenu from "../Components/NavigationMenu";
import FormCrearEjercicio from "./FormCrearEjercicio";

function MenuEjercicioAdmin() {
    const [ejercicioBP, setEjerciciosBP] = useState([]);
    const [ejercicioSM, setEjerciciosSM] = useState([]);

    // Obtener los datos de los Ejercicios para bajar peso
    useEffect(() => {
        fetch('http://localhost:5000/verEjerciciosBP', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Verifica qué datos se reciben
                if (data && data.data) {
                    setEjerciciosBP(data.data);  // Asigna los datos de los ejercicios
                } else {
                    console.log("No se encontró la propiedad 'data' en la respuesta");
                }
            })
            .catch(error => console.error('Error al obtener datos de ejercicios BP:', error));
    }, []);

    // Obtener los datos de los Ejercicios para subir masa
    useEffect(() => {
        fetch('http://localhost:5000/verEjerciciosSM', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Verifica qué datos se reciben
                if (data && data.data) {
                    setEjerciciosSM(data.data);  // Asigna los datos de los ejercicios
                } else {
                    console.log("No se encontró la propiedad 'data' en la respuesta");
                }
            })
            .catch(error => console.error('Error al obtener datos de ejercicios SM:', error));
    }, []);

    // Función para eliminar ejercicio
    const handleEliminarEjercicio = (id) => {
        fetch(`http://localhost:5000/api/eliminarEjercicio/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message); // Mensaje de éxito
                    // Actualizar el estado de los ejercicios
                    setEjerciciosBP(prevEjercicios => prevEjercicios.filter(ejercicio => ejercicio.id !== id));
                    setEjerciciosSM(prevEjercicios => prevEjercicios.filter(ejercicio => ejercicio.id !== id));
                } else {
                    alert(data.error); // Mensaje de error
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al eliminar el ejercicio');
            });
    };


    

    return (
        <div>
            <NavigationMenu />
            <div id="menu-admin-container">
                <br />
                <h2 style={{ color: 'Black', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Ejercicios para bajar de peso</h2>

                <table id="ejercicioBP">
                    <thead>
                        <tr>
                            <th>Nombre Ejercicio</th>
                            <th>Repeticiones</th>
                            <th>Levantamientos</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ejercicioBP.length > 0 ? (
                            ejercicioBP.map(ejercicio => (
                                <tr key={ejercicio.id}>
                                    <td>{ejercicio.nombreEjer}</td>
                                    <td>{ejercicio.repeticiones}</td>
                                    <td>{ejercicio.levantamientos}</td>
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
                                            onClick={() => handleEliminarEjercicio(ejercicio.id)} // Llamada a la función de eliminación
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay ejercicios disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <br />

                <h2 style={{ color: 'Black', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Ejercicios para subir masa</h2>
                <table id="ejercicioSM">
                    <thead>
                        <tr>
                            <th>Nombre Ejercicio</th>
                            <th>Repeticiones</th>
                            <th>Levantamientos</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ejercicioSM.length > 0 ? (
                            ejercicioSM.map(ejercicio => (
                                <tr key={ejercicio.id}>
                                    <td>{ejercicio.nombreEjer}</td>
                                    <td>{ejercicio.repeticiones}</td>
                                    <td>{ejercicio.levantamientos}</td>
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
                                            onClick={() => handleEliminarEjercicio(ejercicio.id)} // Llamada a la función de eliminación
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay ejercicios disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <br />
                <FormCrearEjercicio />
            </div>
        </div>
    );
}

export default MenuEjercicioAdmin;
