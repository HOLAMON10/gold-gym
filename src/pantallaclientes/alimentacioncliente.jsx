import React from 'react';
import NavegacionSuperior from './navegacionsuperior';

const AlimentacionCliente = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Barra de navegación */}
            <NavegacionSuperior />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Objetivos nutricionales */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                    <h2 className="text-2xl font-bold text-indigo-600 mb-6">Tu Objetivo Nutricional Diario</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                            { title: 'Calorías', value: '2,400', unit: 'kcal/día' },
                            { title: 'Proteína', value: '180', unit: 'gramos/día' },
                            { title: 'Carbohidratos', value: '280', unit: 'gramos/día' }
                        ].map((item, index) => (
                            <div key={index} className="bg-indigo-50 rounded-lg p-6 text-center">
                                <h3 className="text-lg font-semibold text-indigo-800 mb-2">{item.title}</h3>
                                <p className="text-3xl font-bold text-indigo-600">{item.value}</p>
                                <p className="text-sm text-indigo-500">{item.unit}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                            Ver Menú
                        </button>
                    </div>
                </div>

                {/* Fundamentos de la Nutrición */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Fundamentos de la Nutrición</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Conoce los fundamentos de la nutrición y cómo cada macronutriente contribuye a tu salud y objetivos fitness.
                    </p>
                </div>

                {/* Macronutrientes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        {
                            title: 'Proteínas',
                            color: 'red',
                            items: ['Construcción muscular', 'Recuperación tisular', 'Función inmune']
                        },
                        {
                            title: 'Carbohidratos',
                            color: 'yellow',
                            items: ['Energía inmediata', 'Rendimiento deportivo', 'Función cerebral']
                        },
                        {
                            title: 'Grasas',
                            color: 'green',
                            items: ['Absorción de vitaminas', 'Producción hormonal', 'Salud cerebral']
                        }
                    ].map((nutrient, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className={`h-3 bg-${nutrient.color}-500`}></div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">{nutrient.title}</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-gray-600">{`Los ${nutrient.title.toLowerCase()} son ${nutrient.title === 'Proteínas' ? 'esenciales' : nutrient.title === 'Carbohidratos' ? 'importantes' : 'necesarios'} para:`}</p>
                                    <ul className="text-gray-600 space-y-2">
                                        {nutrient.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-center">
                                                <span className={`w-2 h-2 bg-${nutrient.color}-500 rounded-full mr-2`}></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Secciones adicionales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Hidratación */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Hidratación</h3>
                        <div className="flex items-center mb-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-600">Consumo diario recomendado:</p>
                                <p className="text-blue-600 font-bold">30-35 ml/kg de peso corporal</p>
                            </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-800">
                                Aumentar la ingesta durante el ejercicio y en climas cálidos
                            </p>
                        </div>
                    </div>

                    {/* Micronutrientes */}
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
                    <p>© 2024 FlexFitness. Consulta con un profesional de la salud antes de realizar cambios en tu dieta.</p>
                </div>
            </footer>
        </div>
    );
};

export default AlimentacionCliente;
