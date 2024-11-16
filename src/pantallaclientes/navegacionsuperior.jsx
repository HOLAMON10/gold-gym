import React from 'react';

const NavegacionSuperior = () => {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-2xl font-bold text-indigo-600">Flex Fitness</h1>
                    <div className="flex space-x-4">
                        <a href="menucliente.html" className="text-gray-600 hover:text-indigo-600">Inicio</a>
                        <a href="rutinascliente.html" className="text-gray-600 hover:text-indigo-600">Rutinas</a>
                        <a href="dietacliente.html" className="text-gray-600 hover:text-indigo-600">Alimentación</a>
                        <a href="perfilcliente.html" className="text-gray-600 hover:text-indigo-600">Mi Perfil</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavegacionSuperior;
