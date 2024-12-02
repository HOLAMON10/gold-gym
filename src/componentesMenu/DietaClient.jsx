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
          color: 'bg-blue-800'
        },
        {
          caloriesMin: 1500,
          caloriesMax: 1800,
          protein: '30%',
          carbs: '40%',
          fats: '30%',
          activityLevel: 'Active',
          recommendation: 'Maintain a moderate calorie deficit with regular exercise. Prioritize lean proteins and complex carbs.',
          color: 'bg-blue-800'
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
          color: 'bg-yellow-800'
        },
        {
          caloriesMin: 3000,
          caloriesMax: 3500,
          protein: '35%',
          carbs: '45%',
          fats: '20%',
          activityLevel: 'Very Active',
          recommendation: 'Consume a higher calorie surplus for accelerated muscle gain. Focus on complex carbs and protein.',
          color: 'bg-yellow-800'
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
          color: 'bg-indigo-800'
        },
        {
          caloriesMin: 2200,
          caloriesMax: 2700,
          protein: '45%',
          carbs: '30%',
          fats: '25%',
          activityLevel: 'Very Active',
          recommendation: 'Slight calorie deficit with a focus on high-protein foods and strength training to maintain muscle while losing fat.',
          color: 'bg-indigo-800'
        },
      ]
    },
    // Add additional categories here...
  ];

  // Modal state and selected recommendation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

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

  return (
    <div>
      <NavBarClient/>
      <div className="bg-[#1c1c1c] min-h-screen flex flex-col items-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">Nutritional Recommendations</h1>

        {/* Grid Layout for 1 item per row on mobile, 2 items for tablets, and 3 items for larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-white text-center mb-4">{goal.icon} {goal.title}</h2>

              {/* Display multiple recommendations for each goal */}
              {goal.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`p-4 sm:p-6 rounded-lg shadow-lg hover:scale-105 transition-all transform ${rec.color} cursor-pointer`}
                  onClick={() => openModal(rec)} // Open modal when clicked
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-center text-white">{rec.activityLevel} Focus</h3>
                  <div className="mt-4 text-xs sm:text-sm text-white">
                    <p><strong>Calories:</strong> {rec.caloriesMin} - {rec.caloriesMax} kcal</p>
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
