import React from 'react';
import NavBarClient from '../Components/NavigationMenuClient';

const NutritionGuide = () => {
  return (
    <div className="bg-gray-100">
        <NavBarClient/>
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Guía Básica de Nutrición</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Conoce los fundamentos de la nutrición y cómo cada macronutriente contribuye a tu salud y objetivos fitness.</p>
        </div>

        {/* Nutrition Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-3 bg-red-500"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Proteínas</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">Las proteínas son esenciales para:</p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Construcción muscular
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Recuperación tisular
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Función inmune
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-800">Consumo recomendado: 1.6-2.2g/kg de peso corporal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-3 bg-yellow-500"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Carbohidratos</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">Los carbohidratos son importantes para:</p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    Energía inmediata
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    Rendimiento deportivo
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    Función cerebral
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">Consumo recomendado: 3-5g/kg de peso corporal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-3 bg-green-500"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Grasas</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">Las grasas son necesarias para:</p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Absorción de vitaminas
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Producción hormonal
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Salud cerebral
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">Consumo recomendado: 0.8-1g/kg de peso corporal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Hidratación</h3>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-600">Consumo diario recomendado:</p>
                <p className="text-blue-600 font-bold">30-35 ml/kg de peso corporal</p>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">Aumentar la ingesta durante el ejercicio y en climas cálidos</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Micronutrientes Esenciales</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-2">Vitaminas</h4>
                <ul className="text-sm text-purple-600 space-y-1">
                  <li>• Vitamina D</li>
                  <li>• Complejo B</li>
                  <li>• Vitamina C</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-bold text-orange-800 mb-2">Minerales</h4>
                <ul className="text-sm text-orange-600 space-y-1">
                  <li>• Hierro</li>
                  <li>• Zinc</li>
                  <li>• Magnesio</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2024 NutriGuía. Consulta con un profesional de la salud antes de realizar cambios en tu dieta.</p>
        </div>
      </footer>
    </div>
  );
};

export default NutritionGuide;
