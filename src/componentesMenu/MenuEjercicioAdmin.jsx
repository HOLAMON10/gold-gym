import React, { useState, useEffect } from 'react';
import './MenuAdmin.css';
import NavigationMenu from "../Components/NavigationMenuEmpAdmin";
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
                    setEjerciciosBP(data.data);  // Asigna los datos de los clientes
                } else {
                    console.log("No se encontró la propiedad 'data' en la respuesta de clientes");
                }
            })
            .catch(error => console.error('Error al obtener datos de clientes:', error));
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
                    setEjerciciosSM(data.data);  // Asigna los datos de los clientes
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
                <h2 style={{ color: 'Black', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Ejercicios para bajar de peso</h2>

                <table id="ejercicioBP">
                    <thead>
                        <tr>

                            <th>Nombre Ejercicio</th>
                            <th>Repeticiones</th>
                            <th>Levantamientos</th>


                        </tr>
                    </thead>
                    <tbody>
                        {ejercicioBP.length > 0 ? (
                            ejercicioBP.map(ejercicioBP => (
                                <tr key={ejercicioBP.id}>

                                    <td>{ejercicioBP.nombreEjer}</td>
                                    <td>{ejercicioBP.repeticiones}</td>
                                    <td>{ejercicioBP.levantamientos}</td>


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

                <h2 style={{ color: 'Black', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Ejercicios para subir masa</h2>
                <table id="ejercicioSM">
                    <thead>
                        <tr>

                            <th>Nombre Ejercicio</th>
                            <th>Repeticiones</th>
                            <th>Levantamientos</th>


                        </tr>
                    </thead>
                    <tbody>
                        {ejercicioSM.length > 0 ? (
                            ejercicioSM.map(ejercicioSM => (
                                <tr key={ejercicioSM.id}>

                                    <td>{ejercicioSM.nombreEjer}</td>
                                    <td>{ejercicioSM.repeticiones}</td>
                                    <td>{ejercicioSM.levantamientos}</td>


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
                <FormCrearEjercicio />



            </div>
        </div>
    );
}

export default MenuEjercicioAdmin;
