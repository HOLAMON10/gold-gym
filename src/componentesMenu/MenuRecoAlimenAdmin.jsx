import React, { useState, useEffect } from 'react';
import './MenuAdmin.css';

import FormCrearRecoAlimen from './FormCrearRecoAlimen';
import NavBar from '../Components/NavigationMenuEmpAdmin';

function MenuRecoAlimenAdmin() {
    const [RecoAlimen, setRecoAlimen] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);  // Controlar si mostrar o no la ventana emergente
    const [SelectedRecoAlimen, setSelectedRecoAlimen] = useState(null);  // Guardar el ejercicio seleccionado para editar
    const [objetivo, setObjetivo] = useState('');
    const [calorias, setCalorias] = useState('');
    const [proteina, setProteina] = useState('');
    const [carbo, setCarbo] = useState('');



    // Obtener los datos de los Recomendaciones Alimenticias
    useEffect(() => {
        fetch('http://localhost:5000/verRecoAlimen', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Verifica qué datos se reciben
                if (data && data.data) {
                    setRecoAlimen(data.data);  // Asigna los datos de las recomendaciones alimenticias
                } else {
                    console.log("No se encontró la propiedad 'data' en la respuesta de recomendaciones alimenticias");
                }
            })
            .catch(error => console.error('Error al obtener datos de recomendaciones alimenticias:', error));
    }, []);



    // Función para eliminar recomendación alimenticia
    const handleEliminarRecoAlimen = (id) => {
        fetch(`http://localhost:5000/api/eliminarRecoAlimen/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message); // Mensaje de éxito
                    // Actualizar el estado de las recomendaciones alimenticias
                    setRecoAlimen(prevRecoAlimen => prevRecoAlimen.filter(item => item.id !== id));
                } else {
                    alert(data.error); // Mensaje de error
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al eliminar la recomendación alimenticia');
            });
    };




    // Función para abrir el popup y cargar los datos del ejercicio seleccionado
    const handleEditarRecoAlimen = (reco) => {
        setSelectedRecoAlimen(reco);
        setObjetivo(reco.objetivo);  // Cargar los datos actuales del ejercicio
        setCalorias(reco.calorias);
        setProteina(reco.proteina);
        setCarbo(reco.carbo);
        setShowEditPopup(true);  // Mostrar la ventana emergente
    };



    // Función para cerrar el popup
    const handleClosePopup = () => {
        setShowEditPopup(false);
        setSelectedRecoAlimen(null);
    };


    // Función para enviar las actualizaciones al servidor
    const handleActualizarRecoAlimen = () => {
        fetch(`http://localhost:5000/api/actualizarRecoAlimen/${SelectedRecoAlimen.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                objetivo,
                calorias,
                proteina,
                carbo

            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert('Recomendacion actualizado correctamente');
                    setShowEditPopup(false);  // Cerrar el popup
                    // Actualizar la tabla de ejercicios con los nuevos datos
                    setRecoAlimen(prevRecoAlimen => prevRecoAlimen.map(ej => ej.id === SelectedRecoAlimen.id ? { ...ej, objetivo: objetivo, calorias, proteina, carbo } : ej));

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
        <div>
            <NavBar />

            <div id="menu-admin-container">

                <br />
                <h2 style={{ color: 'Black', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Recomendación Alimenticia</h2>

                <table id="RecoAlimen">
                    <thead>
                        <tr>
                            <th>Objetivo</th>
                            <th>Calorías</th>
                            <th>Proteína</th>
                            <th>Carbohidratos</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {RecoAlimen.length > 0 ? (
                            RecoAlimen.map(reco => (
                                <tr key={reco.id}>
                                    <td>{reco.objetivo}</td>
                                    <td>{reco.calorias}</td>
                                    <td>{reco.proteina}</td>
                                    <td>{reco.carbo}</td>
                                    <td>
                                        <button
                                            style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                                            onClick={() => handleEditarRecoAlimen(reco)}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                                            onClick={() => handleEliminarRecoAlimen(reco.id)} // Llamada a la función de eliminación
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay recomendaciones alimenticias</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <br />
                <FormCrearRecoAlimen />

                {/* Ventana emergente de edición */}
                {showEditPopup && (
                    <div className="popup-overlay">
                        <div className="popup-container">
                            <h3>Editar Recomendacion</h3>
                            <div>
                                <label htmlFor="objetivo">Objetivo</label>
                                <input
                                    type="text"
                                    id="objetivo"
                                    value={objetivo}
                                    onChange={(e) => setObjetivo(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="calorias">Calorias</label>
                                <input
                                    type="text"
                                    id="calorias"
                                    value={calorias}
                                    onChange={(e) => setCalorias(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="proteina">Proteina</label>
                                <input
                                    type="text"
                                    id="proteina"
                                    value={proteina}
                                    onChange={(e) => setProteina(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="carbo">Carbohidratos</label>
                                <input
                                    type="text"
                                    id="carbo"
                                    value={carbo}
                                    onChange={(e) => setCarbo(e.target.value)}
                                />
                            </div>
                            <div>
                                <button
                                    className="popup-button update"
                                    onClick={handleActualizarRecoAlimen}
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

export default MenuRecoAlimenAdmin;
