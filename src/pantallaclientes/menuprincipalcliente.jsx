import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import NavegacionSuperior from './navegacionsuperior';

const MenuPrincipalCliente = () => {
  // Datos del gráfico
  const chartData = [
    { name: 'Lun', calories: 450, minutes: 45 },
    { name: 'Mar', calories: 520, minutes: 55 },
    { name: 'Mié', calories: 480, minutes: 50 },
    { name: 'Jue', calories: 600, minutes: 65 },
    { name: 'Vie', calories: 550, minutes: 60 },
    { name: 'Sáb', calories: 420, minutes: 40 },
    { name: 'Dom', calories: 500, minutes: 55 }
  ];

  // Estadísticas principales
  const stats = [
    { value: '12', label: 'Entrenamientos' },
    { value: '5.2k', label: 'Calorías' },
    { value: '8', label: 'Días seguidos' },
    { value: '3', label: 'Objetivos' }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Barra de navegación */}
      <NavegacionSuperior />

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenido a Flex Fitness</h2>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tu Progreso</h3>
            
            {/* Cuadrícula de estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="p-4 bg-indigo-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Gráfico */}
            <div className="mt-8 h-64">
              <LineChart width={800} height={256} data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#4F46E5" 
                  name="Calorías Quemadas"
                />
                <Line 
                  type="monotone" 
                  dataKey="minutes" 
                  stroke="#059669" 
                  name="Minutos de Ejercicio"
                />
              </LineChart>
            </div>
          </div>
        </div>
      </div>

      {/* Pie de página */}
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

export default MenuPrincipalCliente;
