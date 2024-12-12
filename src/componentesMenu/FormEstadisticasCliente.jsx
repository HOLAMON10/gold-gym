import React, { useState } from "react";

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
        <div className="max-w-lg mx-auto p-6 bg-[#292929] rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
                Calcular Escala de Peso Ideal
            </h2>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}  {/* Mensaje de error */}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="Ingresa peso"
                    className="p-3 text-white bg-gray-700 rounded-md placeholder-gray-400"
                />

                <input
                    type="text"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    placeholder="Ingrese altura"
                    className="p-3 text-white bg-gray-700 rounded-md placeholder-gray-400"
                />

                <input
                    type="text"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    placeholder="Ingrese edad"
                    className="p-3 text-white bg-gray-700 rounded-md placeholder-gray-400"
                />

                <div className="flex gap-6 justify-between text-white">
                    <div>
                        <input
                            id="checkV"
                            type="radio"
                            name="sexo"
                            value="Hombre"
                            checked={sexo === 'Hombre'}
                            onChange={() => setSexo('Hombre')}
                            className="mr-2"
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
                            className="mr-2"
                        />
                        <label htmlFor="checkM">Mujer</label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Calcular Escala
                </button>
            </form>

            {escala && <p className="mt-6 text-white text-center">Escala calculada: {escala}</p>}
        </div>
    );
}

export default FormEstadisticasCliente;
