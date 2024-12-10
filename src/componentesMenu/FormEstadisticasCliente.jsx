import React, { useState } from "react";
import './MenuAdmin.css';

function FormEstadisticasCliente() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState('');
    const [escala, setEscala] = useState('');
    const [error, setError] = useState('');  // Para manejar errores

    // Obtener el idPersona desde localStorage
    const idPersona = localStorage.getItem("id");

    // Enviar datos al backend
    const escalaEsta = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/calculoPesoIdeal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    peso: parseFloat(peso),  // Asegurarse de que sean números
                    altura: parseInt(altura), // Asegurarse de que sean números
                    edad: parseInt(edad),
                    sexo,
                    id_persona: idPersona,  // Aquí pasamos el idPersona desde localStorage
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Error al calcular la escala");
            } else {
                setEscala(data.escala);
                alert("Recomendación registrada exitosamente");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Error al conectar con el servidor");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevenir el comportamiento por defecto del formulario
        escalaEsta();  // Llamar a la función para enviar los datos
    };

    return (
        <div className="form-small-container2">
            <h2>Calcular Escala de Peso Ideal</h2>
            {error && <div className="error-message">{error}</div>}  {/* Mensaje de error */}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="Ingresa peso"
                    className="inputs-Crear"
                />

                <input
                    type="text"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    placeholder="Ingrese altura"
                    className="inputs-Crear"
                />

                <input
                    type="text"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    placeholder="Ingrese edad"
                    className="inputs-Crear"
                />

                <div className="formCheck">
                    <div>
                        <input
                            id="checkV"
                            type="radio"
                            name="sexo"
                            value="Hombre"
                            checked={sexo === 'Hombre'}
                            onChange={() => setSexo('Hombre')}
                        />
                        <label htmlFor="checkV">Hombre</label>
                    </div>

                    <div>
                        <input
                            id="checkM"
                            type="radio"
                            name="sexo"
                            value="Mujer"
                            checked={sexo === 'Mujer'}
                            onChange={() => setSexo('Mujer')}
                        />
                        <label htmlFor="checkM">Mujer</label>
                    </div>
                </div>

                <button type="submit" className="btn-crear-estadistica">Calcular Escala</button>
            </form>

            {escala && <p>Escala calculada: {escala}</p>}
        </div>
    );
}

export default FormEstadisticasCliente;
