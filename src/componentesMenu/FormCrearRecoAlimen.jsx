import React from "react";
import './MenuAdmin.css';

function FormCrearRecoAlimen() {

    const Agregarclic = () => {
        const objetivo = document.getElementById("objetivo").value;
        const calorias = document.getElementById("calorias").value;
        const proteina = document.getElementById("proteina").value;
        const carbo = document.getElementById("carbo").value;




        // Crear el objeto con los datos del formulario
        const data = {
            objetivo,
            calorias,
            proteina,
            carbo

        };

        // Hacer la petición al backend
        fetch('http://localhost:5000/api/agregarRecoAlimen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                alert("Dieta registrado exitosamente");
            })
            .catch(error => {
                console.error("Error al registrar Dieta:", error);
            });
    };

    return (
        <div className="form-small-container">
            <h2>Agregar Recomendacion Alimenticia</h2>
            <input
                type="text"
                id="objetivo"
                placeholder="Ingresa objetivo"
                className="inputs-Crear"
            />

            <input
                type="number"
                id="calorias"
                placeholder="Ingrese cantidad calorias"
                className="inputs-Crear"
            />

            <input
                type="number"
                id="proteina"
                placeholder="Ingrese cantidad proteina"
                className="inputs-Crear"
            />

            <input
                type="number"
                id="carbo"
                placeholder="Ingrese cantidad carbo"
                className="inputs-Crear"
            />



            <button onClick={Agregarclic} className="btn-crear-usuario">Agregar</button>
        </div>
    );
}


export default FormCrearRecoAlimen;
