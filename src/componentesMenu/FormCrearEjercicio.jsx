import React from "react";
import './MenuAdmin.css';

function FormCrearEjercicio() {

    const Agregarclic = () => {
        const nombreEjer = document.getElementById("nombreEjer").value;
        const repeticiones = document.getElementById("repeticiones").value;
        const levantamientos = document.getElementById("levantamientos").value;
        const objetivo = document.getElementById("objetivo").value; // Capturar valor seleccionado
        const descripcion = document.getElementById("descripcion").value;
        const imagen_ejercicio = document.getElementById("imagen_ejercicio").value;

        // Crear el objeto con los datos del formulario
        const data = {
            nombreEjer,
            repeticiones,
            levantamientos,
            objetivo, // Enviar el valor del dropdown
            descripcion,
            imagen_ejercicio
        };

        // Hacer la petición al backend
        fetch('http://localhost:5000/api/agregarEjercicio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                alert("Ejercicio registrado exitosamente");
            })
            .catch(error => {
                console.error("Error al registrar ejercicio:", error);
            });
    };

    return (
        <div className="form-small-container">
            <h2>Agregar Ejercicio</h2>
            <input
                type="text"
                id="nombreEjer"
                placeholder="Ingresa nombre Ejercicio"
                className="inputs-Crear"
            />

            <input
                type="number"
                id="repeticiones"
                placeholder="Ingrese cantidad repeticiones"
                className="inputs-Crear"
            />

            <input
                type="number"
                id="levantamientos"
                placeholder="Ingrese cantidad levantamientos"
                className="inputs-Crear"
            />

            {/* Cambiar de input a select para el objetivo */}
            <select id="objetivo" className="inputs-Crear">
                <option value="">Selecciona el objetivo</option>
                <option value="Pecho">Pectorales</option>
                <option value="Espalda">Dorsales</option>
                <option value="Piernas">Hombros</option>
                <option value="Brazos">Triceps</option>
                <option value="Brazos">Biceps</option>
                <option value="Abdomen">Piernas</option>
                
            </select>

            <input
                type="text"
                id="descripcion"
                placeholder="Ingresa descripcion"
                className="inputs-Crear"
            />

            <input
                type="text"
                id="imagen_ejercicio"
                placeholder="Ingresa imagen"
                className="inputs-Crear"
            />

            <button onClick={Agregarclic} className="btn-crear-usuario">Agregar ejercicio</button>
        </div>
    );
}

export default FormCrearEjercicio;
