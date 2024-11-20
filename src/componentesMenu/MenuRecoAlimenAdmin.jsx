import React, { useState, useEffect } from 'react';
import './MenuAdmin.css';
import NavigationMenu from "../Components/NavigationMenu";
import FormCrearRecoAlimen from './FormCrearRecoAlimen';



function MenuRecoAlimenAdmin() {
    const [RecoAlimen, setRecoAlimen] = useState([]);



    // Obtener los datos de los Ejercicios para bajar peso
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
                    setRecoAlimen(data.data);  // Asigna los datos de los clientes
                } else {
                    console.log("No se encontró la propiedad 'data' en la respuesta de clientes");
                }
            })
            .catch(error => console.error('Error al obtener datos de clientes:', error));
    }, []);




    return (
        <div>
            <NavigationMenu />

            <div id="menu-admin-container">

                <br />
                <h2 style={{ color: 'Black', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Recomendacion Alimenticia</h2>

                <table id="RecoAlimen">
                    <thead>
                        <tr>

                            <th>Objetivo</th>
                            <th>calorias</th>
                            <th>proteina</th>
                            <th>carbohidratos</th>


                        </tr>
                    </thead>
                    <tbody>
                        {RecoAlimen.length > 0 ? (
                            RecoAlimen.map(RecoAlimen => (
                                <tr key={RecoAlimen.id}>

                                    <td>{RecoAlimen.objetivo}</td>
                                    <td>{RecoAlimen.calorias}</td>
                                    <td>{RecoAlimen.proteina}</td>
                                    <td>{RecoAlimen.carbo}</td>


                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay recomendaciones</td>
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
