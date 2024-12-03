import React, { useState } from 'react';
import NavBarClient from '../Components/NavigationMenuClient';

const NutritionGuide = () => {
  const goals = [
    {
      title: 'Weight Loss',
      icon: '⚖️',
      recommendations: [
        {
          caloriesMin: 1200,
          caloriesMax: 1500,
          protein: '30%',
          carbs: '40%',
          fats: '30%',
          activityLevel: 'Sedentary',
          recommendation: 'Reduce calorie intake and increase physical activity. Focus on protein-rich foods and fiber to stay full longer.',
        },
        {
          caloriesMin: 1500,
          caloriesMax: 1800,
          protein: '30%',
          carbs: '40%',
          fats: '30%',
          activityLevel: 'Active',
          recommendation: 'Maintain a moderate calorie deficit with regular exercise. Prioritize lean proteins and complex carbs.',
        },
      ]
    },
    {
      title: 'Muscle Gain',
      icon: '💪',
      recommendations: [
        {
          caloriesMin: 2500,
          caloriesMax: 3000,
          protein: '30%',
          carbs: '45%',
          fats: '20%',
          activityLevel: 'Moderate',
          recommendation: 'Increase calorie intake and focus on protein-rich foods to support muscle growth. Combine with strength training.',
        },
        {
          caloriesMin: 3000,
          caloriesMax: 3500,
          protein: '35%',
          carbs: '45%',
          fats: '20%',
          activityLevel: 'Very Active',
          recommendation: 'Consume a higher calorie surplus for accelerated muscle gain. Focus on complex carbs and protein.',
        },
      ]
    },
    {
      title: 'Muscle Definition',
      icon: '🏆',
      recommendations: [
        {
          caloriesMin: 2000,
          caloriesMax: 2500,
          protein: '40%',
          carbs: '35%',
          fats: '25%',
          activityLevel: 'Active',
          recommendation: 'Focus on reducing body fat while maintaining muscle. Higher protein and moderate carbs will help with muscle definition.',
        },
        {
          caloriesMin: 2200,
          caloriesMax: 2700,
          protein: '45%',
          carbs: '30%',
          fats: '25%',
          activityLevel: 'Very Active',
          recommendation: 'Slight calorie deficit with a focus on high-protein foods and strength training to maintain muscle while losing fat.',
        },
      ]
    },
  ];

  // Modal state and selected recommendation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(true);

  // Open modal with selected recommendation
  const openModal = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecommendation(null);
  };

  const closeDisclaimer = () => {
    setIsDisclaimerVisible(false);
  };

  return (
    <div className="bg-[#292929] min-h-screen" style={{
      backgroundColor: '#292929', 
      backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
      backgroundSize: '10px 10px',
    }}>
      
      <NavBarClient />
      <div className="flex flex-col items-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">Nutritional Recommendations</h1>

        {isDisclaimerVisible && (
          <div className="relative bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500 max-w-3xl mb-8 shadow-lg text-gray-300 text-center text-sm sm:text-base">
            <button
              onClick={closeDisclaimer}
              className="absolute top-2 right-2 text-white bg-gray-700 hover:bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center focus:outline-none"
            >
              ✖️
            </button>
            ⚠️ <span className="font-bold">Aviso:</span> Esta guía ofrece recomendaciones nutricionales generales y no debe considerarse un sustituto del asesoramiento médico profesional. Consulta siempre con un profesional de la salud o un dietista certificado para obtener orientación personalizada.
          </div>
        )}

        {/* Grid Layout for 1 item per row on mobile, 2 items for tablets, and 3 items for larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 w-2/4">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-6 mb-12 " >
              <h2 className="text-xl sm:text-2xl font-semibold text-white text-center ">{goal.icon} {goal.title}</h2>
              
              {/* Display multiple recommendations for each goal */}
              {goal.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-6 rounded-lg shadow-lg hover:scale-105 transition-all transform bg-[#869D96] cursor-pointer bg-opacity-90 "
                  onClick={() => openModal(rec)} // Open modal when clicked
                >
                  {/* 3 images for each recommendation */}
                  <div className="flex justify-between">
                    <img src="/images/makeitmeme_ImsdW.jpeg" alt="Recommendation" className="w-1/3 h-1/4 object-cover rounded-lg mb-4" style={{ maxWidth: '1920px', maxHeight: '1080px', width: '100%', height: 'auto' }} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-center text-white">{rec.activityLevel} Focus</h3>
                  <div className="mt-4 text-xs sm:text-sm text-white">
                    <p className='text-lg'><strong>Calories:</strong> {rec.caloriesMin} - {rec.caloriesMax} kcal</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Modal Popup for Detailed Information */}
        {isModalOpen && selectedRecommendation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-[#2b2b2b] p-6 sm:p-8 rounded-lg w-80 sm:w-96 max-w-full">
              <h2 className="text-xl sm:text-2xl font-semibold text-center text-white">{selectedRecommendation.icon} {selectedRecommendation.title}</h2>
              <div className="mt-4 text-xs sm:text-sm text-white">
                <p><strong>Calories:</strong> {selectedRecommendation.caloriesMin} - {selectedRecommendation.caloriesMax} kcal</p>
                <p><strong>Protein:</strong> {selectedRecommendation.protein}</p>
                <p><strong>Carbs:</strong> {selectedRecommendation.carbs}</p>
                <p><strong>Fats:</strong> {selectedRecommendation.fats}</p>
                <p><strong>Activity Level:</strong> {selectedRecommendation.activityLevel}</p>
                <p className="mt-4">{selectedRecommendation.recommendation}</p>
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
