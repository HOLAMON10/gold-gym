import React from 'react';
import NavegacionSuperior from './navegacionsuperior';

const ExerciseItem = ({ icon, title, reps }) => (
    <div className="flex items-center space-x-4">
        <div className="bg-indigo-100 rounded-lg p-3">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{reps}</p>
        </div>
    </div>
);

const WorkoutCard = ({ day, type, exercises, isRest = false }) => {
    const baseClasses = "rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300";
    const cardClasses = isRest ? `${baseClasses} bg-green-50` : `${baseClasses} bg-white`;
    const borderClasses = isRest ? "border-green-200" : "";
    const textColorClasses = isRest ? "text-green-600" : "text-indigo-600";

    if (isRest) {
        return (
            <div className={cardClasses}>
                <div className="p-6">
                    <div className={`border-b ${borderClasses} pb-4 mb-4`}>
                        <h2 className={`text-2xl font-bold ${textColorClasses}`}>{day}</h2>
                        <p className="text-lg text-green-600">{type}</p>
                    </div>
                    <div className="space-y-3 text-green-600">
                        <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Recuperación activa
                        </p>
                        <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Estiramiento suave
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cardClasses}>
            <div className="p-6">
                <div className="border-b pb-4 mb-4">
                    <h2 className="text-2xl font-bold text-indigo-600">{day}</h2>
                    <p className="text-lg text-gray-600">{type}</p>
                </div>
                <div className="space-y-4">
                    {exercises.map((exercise, index) => (
                        <ExerciseItem key={index} {...exercise} />
                    ))}
                </div>
                <button className="mt-6 w-full bg-indigo-50 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-100 transition-colors duration-300">
                    Ver rutina completa
                </button>
            </div>
        </div>
    );
};

const RutinasCliente = () => {
    const workoutData = [
        {
            day: "Lunes",
            type: "Pecho y Tríceps",
            exercises: [
                {
                    icon: <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>,
                    title: "Press de Banca",
                    reps: "4 series x 12 reps"
                },
                {
                    icon: <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>,
                    title: "Press Inclinado",
                    reps: "3 series x 12 reps"
                }
            ]
        },
        {
            day: "Martes",
            type: "Espalda y Bíceps",
            exercises: [
                {
                    icon: <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>,
                    title: "Dominadas",
                    reps: "4 series x 10 reps"
                },
                {
                    icon: <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>,
                    title: "Remo con Barra",
                    reps: "3 series x 12 reps"
                }
            ]
        },
        { day: "Miércoles", type: "Día de Descanso", isRest: true },
        // Resto de los datos...
    ];

    return (
        <div className="bg-gray-50">
            <NavegacionSuperior />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Tu Rutina Semanal</h1>
                    <p className="text-lg text-gray-600">Programa personalizado para máximos resultados</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {workoutData.map((workout, index) => (
                        <WorkoutCard key={index} {...workout} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Ver mi progreso
                    </button>
                </div>
            </div>

            <footer className="bg-white mt-12 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center text-gray-600">
                        <p>© 2024 Flex Fitness. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default RutinasCliente;
