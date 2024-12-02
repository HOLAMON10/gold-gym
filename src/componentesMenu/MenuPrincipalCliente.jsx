import React from 'react';
import NavBarClient from '../Components/NavigationMenuClient';

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
    <div className='bg-black min-h-screen'>
      <NavBarClient />

      <div className="max-w-7xl mx-auto px-4 py-8 ">

        <div className="bg-white rounded-lg shadow-lg p-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenido a Valerio Fitness</h2>

          {/* Services Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card
              title="Rutinas Personalizadas"
              description="Descubre rutinas adaptadas a tus objetivos y nivel de experiencia."
              bgColor="bg-indigo-50"
            />
            <Card
              title="Plan de Nutrición"
              description="Planes de alimentación diseñados para maximizar tus resultados."
              bgColor="bg-indigo-50"
            />
            <Card
              title="Seguimiento Personal"
              description="Monitorea tu progreso y alcanza tus metas fitness."
              bgColor="bg-indigo-50"
            />
          </div>

          {/* Progress Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tu Progreso</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard value="12" label="Entrenamientos" />
              <StatCard value="5.2k" label="Calorías" />
              <StatCard value="8" label="Días seguidos" />
              <StatCard value="3" label="Objetivos" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center text-gray-600">
              <p>© 2024 Valerio Fitness. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
