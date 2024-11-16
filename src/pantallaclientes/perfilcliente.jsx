import React from 'react';
import NavegacionSuperior from './navegacionsuperior';

const PerfilCliente = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Barra de navegación */}
      <NavegacionSuperior />

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Foto de perfil */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 overflow-hidden">
              <img src="/api/placeholder/128/128" alt="Foto de perfil" className="w-full h-full object-cover" />
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">
              Cambiar foto
            </button>
          </div>
        </div>

        {/* Información personal */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Información Personal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                defaultValue="Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de usuario
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                defaultValue="@juanperez"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                defaultValue="juan.perez@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input 
                type="tel" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                defaultValue="+1 234 567 8900"
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancelar
          </button>
          <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Guardar cambios
          </button>
        </div>
      </div>

      {/* Footer */}
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

export default PerfilCliente;
