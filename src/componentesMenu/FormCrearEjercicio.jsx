import React from "react";
import './MenuAdmin.css';

function FormCrearEjercicio() {

    const Agregarclic = () => {
        const nombreEjer = document.getElementById("nombreEjer").value;
        const repeticiones = document.getElementById("repeticiones").value;
        const levantamientos = document.getElementById("levantamientos").value;
        const idrutina = document.querySelector('input[name="idrutina"]:checked')?.value;
        if (!idrutina) {
            alert("Por favor selecciona una rutina para asignar el ejercicio");
            return;
        }




        // Crear el objeto con los datos del formulario
        const data = {
            nombreEjer,
            repeticiones,
            levantamientos,
            idrutina,

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

            <form className="formCheck">
                <div>
                    <input id="checkE" type="radio" name="idrutina" value="1" />
                    <label htmlFor="checkE">BajarPeso</label>
                </div>

                <div>
                    <input id="checkC" type="radio" name="idrutina" value="2" />
                    <label htmlFor="checkC">SubirMasa</label>
                </div>
            </form>



            <button onClick={Agregarclic} className="btn-crear-usuario">Agregar ejercicio</button>
        </div>
    );
}


export default FormCrearEjercicio;
