import React, { useState, useEffect } from 'react';
import './MenuAdmin.css';
import NavigationMenu from "../Components/NavigationMenu";
import FormCrearRecoAlimen from './FormCrearRecoAlimen';

function MenuRecoAlimenAdmin() {
    const [RecoAlimen, setRecoAlimen] = useState([]);

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

    

    return (
        <div>
            <NavigationMenu />

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

            </div>
        </div>
    );
}

export default MenuRecoAlimenAdmin;
