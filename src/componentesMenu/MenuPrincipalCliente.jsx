import React from 'react';
import NavBarClient from '../Components/NavigationMenuClient';
import FormEstadisticasCliente from './FormEstadisticasCliente';
import LinesChart from './LinesChart';
// Card Component for the services section
const Card = ({ title, description, bgColor }) => {
  return (
    <div className={`p-4 ${bgColor} rounded-lg`}>
      <h3 className="text-lg font-semibold text-indigo-600 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Stats Component for the progress section
const StatCard = ({ value, label }) => {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-indigo-600">{value}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

// Main Component
const Dashboard = () => {
  return (
    <div className="bg-[#292929] min-h-screen" style={{
      backgroundColor: '#292929', // Base background color
      backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
      backgroundSize: '10px 10px' // CSS pattern
    }}>
      <NavBarClient />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="bg-white rounded-lg shadow-lg p-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenido a su Interfaz de Progreso</h2>

         


          {/* Progress Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tu Progreso de Peso Ideal</h3>
            <LinesChart/>
            <FormEstadisticasCliente/>

          </div>
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
