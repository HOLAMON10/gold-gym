import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function LinesChart() {
    const [escala, setEscala] = useState([]);
    const [fechas, setFechas] = useState([]);

    useEffect(() => {
        // Obtener el id del cliente desde localStorage
        const id_cliente = localStorage.getItem("id");

        // Función para obtener los datos de la API
        const fetchData = async () => {
            try {
                // Llamar a la API usando el id_cliente
                const response = await fetch(`http://localhost:5000/api/escalaPesoIdeal/${id_cliente}`);
                const data = await response.json();

                // Verificamos si la respuesta no tiene errores
                if (!response.ok) {
                    console.error("Error al obtener los datos:", data.error);
                    return;
                }

                // Formateamos los datos para que los arrays de escala y fechas queden listos para el gráfico
                const escalaArray = data.map(item => item[0]); // Los valores de 'escala'
                const fechasArray = data.map(item => item[1]); // Las fechas

                // Actualizamos los estados con los datos recibidos
                setEscala(escalaArray);
                setFechas(fechasArray);
            } catch (error) {
                console.error("Error al realizar la solicitud a la API:", error);
            }
        };

        // Llamamos a la función para traer los datos solo si id_cliente está disponible
        if (id_cliente) {
            fetchData();
        }
    }, []);

    // Configuración de los datos y opciones del gráfico
    const midata = {
        labels: fechas,  // Usamos las fechas obtenidas desde la API
        datasets: [
            {
                label: 'Escala de Peso Ideal',
                data: escala,  // Usamos las escalas obtenidas desde la API
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: 'rgba(130, 200, 80, 0.2)',
                pointRadius: 5,
                pointBorderColor: 'rgba(0, 0, 0)',
                pointBackgroundColor: 'rgba(0, 0, 0)',
            },
        ],
    };

    const misoptions = {
        scales: {
            y: {
                min: 1,  // Escala de 1 a 10
                max: 10,
            },
            x: {
                ticks: { color: 'rgb(0, 0, 0)' },
            },
        },
    };

    return <Line data={midata} options={misoptions} />;
}
