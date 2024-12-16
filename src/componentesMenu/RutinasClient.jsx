import React, { useState, useEffect } from "react";
import NavBarClient from "../Components/NavigationMenuClient";
import FavoriteIcon from '@mui/icons-material/Favorite';

const Rutinas = () => {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedObjectives, setSelectedObjectives] = useState([]);
    const [allObjectives, setAllObjectives] = useState([]);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [favoriteExercises, setFavoriteExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                // Fetch exercises
                const response = await fetch("http://127.0.0.1:5000/api/get_exercises");
                const data = await response.json();
                setExercises(data);

                // Extract all unique objectives
                const uniqueObjectives = [...new Set(data.map((exercise) => exercise.objetivo))];
                setAllObjectives(uniqueObjectives);
                setIsLoading(false);

                // Fetch the favorites for the current client
                const id_cliente = localStorage.getItem("id");
                const favoritesResponse = await fetch("http://127.0.0.1:5000/api/get_favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id_cliente }),
                });
                const favoriteData = await favoritesResponse.json();
                const favoriteIds = favoriteData.map(favorite => favorite.nombreEjer);
                console.log("test", favoriteIds)
                setFavoriteExercises(favoriteIds);

            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };
        fetchExercises();
    }, []);

    const openModal = (exercise) => {
        setSelectedExercise(exercise);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleObjective = (objective) => {
        setSelectedObjectives((prevSelected) =>
            prevSelected.includes(objective)
                ? prevSelected.filter((obj) => obj !== objective)
                : [...prevSelected, objective]
        );
    };

    const handleClearFilter = () => {
        setSelectedObjectives([]); // Clears the selected filters
    };

    const filteredExercises =
        selectedObjectives.length > 0
            ? exercises.filter((exercise) => selectedObjectives.includes(exercise.objetivo))
            : exercises;

    const groupedExercises = filteredExercises.reduce((acc, exercise) => {
        if (!acc[exercise.objetivo]) {
            acc[exercise.objetivo] = [];
        }
        acc[exercise.objetivo].push(exercise);
        return acc;
    }, {});

    const handleFavoriteToggle = async (exercise) => {
        const id_cliente = localStorage.getItem("id"); // Assuming the client ID is stored in localStorage
        try {
            const response = await fetch("http://127.0.0.1:5000/api/favorite_exercise", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_cliente,
                    id_ejercicio: exercise.idEjercicio, // Assuming exercise object has id_ejercicio
                }),
            });

            if (response.ok) {
                const message = await response.json();

                // Update favorite exercises based on the response
                setFavoriteExercises((prevFavorites) => {
                    if (message.message === "Exercise added to favorites") {
                        return [...prevFavorites, exercise.nombreEjer]; // Add exercise to favorites
                    } else if (message.message === "Exercise removed from favorites") {
                        return prevFavorites.filter((id) => id !== exercise.nombreEjer); // Remove exercise from favorites
                    }
                    return prevFavorites;
                });
            } else {
                console.error("Error saving favorite exercise");
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const closeFilterModal = (e) => {
        if (e.target === e.currentTarget) {
            setFilterModalOpen(false);
        }
    };

    return (
        <div className="bg-[#292929] min-h-screen" style={{
            backgroundColor: '#292929', // Base background color
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '10px 10px' // CSS pattern
        }}>
            <NavBarClient />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col lg:flex-row">
                {/* Filter Button ONLY on Mobile and iPad */}
                <div className="w-full mb-6 block sm:hidden md:block lg:hidden">
                    <button
                        onClick={() => setFilterModalOpen(true)}
                        className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-all"
                    >
                        Filtrar
                    </button>
                </div>

                {/* Filter Sidebar (Desktop Only) */}
                <div className="lg:block hidden lg:w-1/4 w-full lg:mr-6 mb-6 lg:mb-0 lg:ml-0">
                    <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg h-auto max-h-full">
                        <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b-2 border-teal-600">Filtros</h3>
                        <div className="flex items-center space-x-2 mb-6">
                            <button
                                onClick={handleClearFilter}
                                className="text-teal-600 text-lg px-4 py-2 rounded-lg bg-gray-700 hover:bg-teal-700 transition-all duration-200"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                        <ul className="space-y-4 max-h-none lg:max-h-none overflow-y-auto">
                            {allObjectives.map((objective) => (
                                <li
                                    key={objective}
                                    onClick={() => toggleObjective(objective)}
                                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedObjectives.includes(objective)
                                        ? "bg-teal-700 text-white"
                                        : "bg-[#292929] text-gray-300 hover:bg-teal-600"
                                        }`}
                                >
                                    <span className="text-lg">{objective}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Exercises Section */}
                <div className="lg:w-3/4 w-full">
                    {Object.keys(groupedExercises).map((objective, index) => (
                        <section key={objective} className="mb-12 border-b border-gray-600 pb-6">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-[#F7F7F7]">
                                {objective}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {groupedExercises[objective].map((exercise) => (
                                    <div
                                        key={exercise.nombreEjer}
                                        className="bg-[#474747] rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-150 text-[#F7F7F7] relative"
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

                                        {/* Favorite Button centered */}
                                        <button
                                            onClick={() => handleFavoriteToggle(exercise)}
                                            className="relative bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition-all"
                                        >
                                            <FavoriteIcon
                                                fontSize="large"
                                                className={favoriteExercises.includes(exercise.nombreEjer) ? "text-yellow-500" : ""}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            {/* Modal Responsiveness */}
            {isModalOpen && selectedExercise && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30">
                    <div className="bg-[#292929] p-4 sm:p-6 rounded-lg w-full max-w-sm md:max-w-lg h-auto md:h-6/6 relative overflow-y-auto">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-white hover:text-gray-900 text-2xl"
                        >
                            ×
                        </button>
                        <div>
                            {/* Flex container for nombreEjer and favorite icon */}
                            <div className="flex items-center justify-start mb-4">
                                <h2 className="text-white text-xl md:text-2xl font-bold mr-2">
                                    {selectedExercise.nombreEjer}
                                </h2>
                                <button
                                    onClick={() => handleFavoriteToggle(selectedExercise)}
                                    className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition-all"
                                >
                                    <FavoriteIcon
                                        fontSize="large"
                                        className={favoriteExercises.includes(selectedExercise.nombreEjer) ? "text-yellow-500" : ""}
                                    />
                                </button>
                            </div>
                            {/* Image section */}
                            <div className="h-72 md:h-[75%] bg-gray-200 mt-4 flex items-center justify-center">
                                <img
                                    src={`/images/${selectedExercise.imagen_ejercicio}`}
                                    alt={selectedExercise.nombreEjer}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            {/* Exercise details */}
                            <p className="mt-4 text-white"><strong>Repeticiones:</strong> {selectedExercise.repeticiones}</p>
                            <p className="mt-4 text-white"><strong>Levantamientos:</strong> {selectedExercise.levantamientos}</p>
                            <p className="mt-4 text-white"><strong>Descripcion:</strong> {selectedExercise.descripcion}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Filter Modal */}
            {filterModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10" onClick={closeFilterModal}>
                    <div className="w-3/4 sm:w-2/3 bg-[#1F1F1F] p-6 rounded-lg absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
                        <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b-2 border-teal-600">Filtros</h3>
                        <div className="flex items-center space-x-2 mb-6">
                            <button
                                onClick={handleClearFilter}
                                className="text-teal-600 text-lg px-4 py-2 rounded-lg bg-gray-700 hover:bg-teal-700 transition-all duration-200"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                        <ul className="space-y-4 overflow-y-auto max-h-60">
                            {allObjectives.map((objective) => (
                                <li
                                    key={objective}
                                    onClick={() => toggleObjective(objective)}
                                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedObjectives.includes(objective)
                                        ? "bg-teal-700 text-white"
                                        : "bg-[#292929] text-gray-300 hover:bg-teal-600"
                                        }`}
                                >
                                    <span className="text-lg">{objective}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rutinas;
