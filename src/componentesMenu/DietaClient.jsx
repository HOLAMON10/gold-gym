import React, { useState, useEffect } from 'react';
import NavBarClient from '../Components/NavigationMenuClient';

const NutritionGuide = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:5000/verRecoAlimen');
        const data = await response.json();

        if (response.ok) {
          setRecommendations(data.data); // Assuming the API returns data in a "data" key
        } else {
          setError(data.message || 'Failed to fetch recommendations');
        }
      } catch (err) {
        setError('Error connecting to the server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const openModal = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecommendation(null);
  };

  const closeDisclaimer = () => {
    setIsDisclaimerVisible(false);
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
      <div className="flex flex-col items-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
          Nutritional Recommendations
        </h1>

        {isDisclaimerVisible && (
          <div className="relative bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500 max-w-3xl mb-8 shadow-lg text-gray-300 text-center text-sm sm:text-base">
            <button
              onClick={closeDisclaimer}
              className="absolute top-2 right-2 text-white bg-gray-700 hover:bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center focus:outline-none"
            >
              ✖️
            </button>
            ⚠️{' '}
            <span className="font-bold">
              Aviso:
            </span>{' '}
            Esta guía ofrece recomendaciones nutricionales generales y no debe considerarse un sustituto del asesoramiento médico profesional. Consulta siempre con un profesional de la salud o un dietista certificado para obtener orientación personalizada.
          </div>
        )}

        {/* Show loading spinner or error message */}
        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          // Display fetched recommendations
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 w-2/4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="space-y-6 mb-12"
                onClick={() => openModal(rec)} // Open modal when clicked
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-white text-center">
                  {rec.objetivo}
                </h2>
                <div
                  className="p-6 sm:p-6 rounded-lg shadow-lg hover:scale-105 transition-all transform bg-[#869D96] cursor-pointer bg-opacity-90"
                >
                  <img
                    src={`/images/${rec.imagen_recom}` || '/images/placeholder.png'}
                    alt="Recommendation"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="mt-4 text-xs sm:text-sm text-white">
                    <p className="text-lg">
                      <strong>Calories:</strong> {rec.calorias} kcal
                    </p>
                    <p>
                      <strong>Protein:</strong> {rec.proteina}
                    </p>
                    <p>
                      <strong>Carbs:</strong> {rec.carbo}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Popup for Detailed Information */}
        {isModalOpen && selectedRecommendation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-[#2b2b2b] p-6 sm:p-8 rounded-lg w-80 sm:w-96 max-w-full">
              <h2 className="text-xl sm:text-2xl font-semibold text-center text-white">
                {selectedRecommendation.objetivo}
              </h2>
              <div className="mt-4 text-xs sm:text-sm text-white">
              <img
                    src={`/images/${selectedRecommendation.imagen_recom}` || '/images/placeholder.png'}
                    alt="Recommendation"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                <p>
                  <strong>Calories:</strong> {selectedRecommendation.calorias} kcal
                </p>
                <p>
                  <strong>Protein:</strong> {selectedRecommendation.proteina}
                </p>
                <p>
                  <strong>Carbs:</strong> {selectedRecommendation.carbo}
                </p>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={closeModal}
                  className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionGuide;
