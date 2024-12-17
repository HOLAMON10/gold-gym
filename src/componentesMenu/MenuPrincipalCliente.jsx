import React, { useEffect, useState } from 'react';
import NavBarClient from '../Components/NavigationMenuClient';
import FormEstadisticasCliente from './FormEstadisticasCliente';
import LinesChart from './LinesChart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedExercises, setGroupedExercises] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [favoriteExercises, setFavoriteExercises] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem('id');
      try {
        const response = await fetch('http://localhost:5000/api/get_favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_cliente: userId }),
        });
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const openModal = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedExercise(null);
    setIsModalOpen(false);
  };

  const handleFavoriteToggle = (exercise) => {
    setFavoriteExercises((prevFavorites) => {
      if (prevFavorites.includes(exercise.nombreEjer)) {
        return prevFavorites.filter((name) => name !== exercise.nombreEjer);
      } else {
        return [...prevFavorites, exercise.nombreEjer];
      }
    });
  };

  return (
    <div
      className="bg-[#292929] min-h-screen"
      style={{
        backgroundColor: '#292929',
        backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
        backgroundSize: '10px 10px',
      }}
    >
      <NavBarClient />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Bienvenido a tu Interfaz de Progreso
          </h2>

          {/* Section: Exercise Cards */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Tus Ejercicios Favoritos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((exercise) => (
                <div
                  key={exercise.nombreEjer}
                  className="bg-[#474747] rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-150 text-[#F7F7F7] flex flex-col"
                >
                  <button
                    onClick={() => openModal(exercise)}
                    className="w-full"
                  >
                    <div className="h-48 sm:h-56 bg-gray-200">
                      <img
                        src={`/images/${exercise.imagen_ejercicio}`}
                        alt={exercise.nombreEjer}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 sm:p-6 flex-grow">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">
                        {exercise.nombreEjer}
                      </h3>
                      <p>{exercise.descripcion}</p>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section: FormEstadisticasCliente */}
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Tu Progreso de Peso Ideal
            </h3>
            <div className="w-full max-w-3xl mx-auto">
              <FormEstadisticasCliente />
            </div>
          </div>

          {/* Section: LinesChart */}
          <div className="border-t border-gray-200 pt-6 mb-8 ">
            <div>
              <LinesChart />
            </div>
          </div>

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

        </div>

        {/* Footer */}
        <footer className="bg-white mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center text-gray-600">
              <p>© 2024 Flexx Fitness. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
