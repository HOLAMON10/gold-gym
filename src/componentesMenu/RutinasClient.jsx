import React, { useState, useEffect } from "react";
import NavBarClient from "../Components/NavigationMenuClient";
import FavoriteIcon from '@mui/icons-material/Favorite';

const Rutinas = () => {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedExercise, setSelectedExercise] = useState(null);  // To store the selected exercise for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);  // To control modal visibility

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/get_exercises");
                const data = await response.json();
                setExercises(data);
                console.log("Exercises data:", data);  // Debugging output
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };
        fetchExercises();
    }, []);

    // Group exercises by their 'objective'
    const groupedExercises = exercises.reduce((acc, exercise) => {
        if (!acc[exercise.objetivo]) {
            acc[exercise.objetivo] = [];
        }
        acc[exercise.objetivo].push(exercise);
        return acc;
    }, {});

    // Function to handle opening the modal
    const openModal = (exercise) => {
        setSelectedExercise(exercise);
        setIsModalOpen(true);
    };

    // Function to handle closing the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[#292929]">
            <NavBarClient />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
                {Object.keys(groupedExercises).map((objective) => (
                    <section key={objective} className="mb-12">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-[#F7F7F7]">
                            {objective}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedExercises[objective].map((exercise) => (
                                <div
                                    key={exercise.name}
                                    className="bg-[#1F1F1F] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow text-[#F7F7F7]"
                                >
                                    <button onClick={() => openModal(exercise)}>
                                        <div className="h-48 sm:h-56 bg-gray-200">
                                            <img
                                                src={`/images/${exercise.imagen_ejercicio}`}
                                                alt={exercise.nombreEjer}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4 sm:p-6">
                                            <h3 className="text-lg sm:text-xl font-bold mb-2">
                                                {exercise.nombreEjer}
                                            </h3>
                                            <p>{exercise.descripcion}</p>
                                        </div>
                                    </button>
                                    <button
                                        className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition-all"
                                    >
                                        <FavoriteIcon fontSize="large" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Modal Responsiveness */}
            {isModalOpen && selectedExercise && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30">
                    <div className="bg-[#141414] p-4 sm:p-6 rounded-lg w-full max-w-md md:max-w-3xl h-auto md:h-3/5 relative overflow-y-auto">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
                        >
                            ×
                        </button>
                        <div>
                            <h2 className="text-white text-xl md:text-2xl font-bold">{selectedExercise.nombreEjer}</h2>
                            <div className="h-60 md:h-80 bg-gray-200 mt-4">
                                <img
                                    src={`/images/${selectedExercise.imagen_ejercicio}`}
                                    alt={selectedExercise.nombreEjer}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="mt-4 text-white"><strong>Repeticiones:</strong> {selectedExercise.repeticiones}</p>
                            <p className="mt-4 text-white"><strong>Levantamientos:</strong> {selectedExercise.levantamientos}</p>
                            <p className="mt-4 text-white"><strong>Descripcion:</strong> {selectedExercise.descripcion}</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Rutinas;
