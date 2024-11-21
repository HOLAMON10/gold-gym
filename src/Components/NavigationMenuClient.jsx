import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Usaremos NavLink para la navegación
import PrivateRoute from './PrivateRoute';


function NavBarClient() {
    const navigate = useNavigate();  // Para redirigir después de cerrar sesión

    // Función para cerrar sesión
    const handleLogout = () => {
        // Borrar los datos de sesión
        sessionStorage.clear();

        // Opcional: Redirigir al usuario a la página de login
        navigate('/login');
    };
    return (
        <nav className="bg-[#3D3E3D] shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-3xl font-bold text-white tracking-wider hover:text-teal-400 transition duration-300 ease-in-out">Valerio Fitness</h1>
                    <div className="flex space-x-6">
                        <PrivateRoute>
                            <NavLink
                                to="/componentesMenu/MenuPrincipalCliente"
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold border-b-2 border-teal-400"
                : "text-gray-300 hover:text-teal-400 hover: transition duration-300 ease-in-out"
                                }
                            >
                                Dashboard
                            </NavLink>
                        </PrivateRoute>

                        <PrivateRoute>
                            <NavLink
                                to="/componentesMenu/DietaClient"
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold border-b-2 border-teal-400"
                : "text-gray-300 hover:text-teal-400 hover: transition duration-300 ease-in-out"
                                }
                            >
                                Informacion sobre Dietas
                            </NavLink>
                        </PrivateRoute>
                        <PrivateRoute>
                            <NavLink
                                to="/componentesMenu/MenuRecoAlimenAdmin"
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold border-b-2 border-teal-400"
                : "text-gray-300 hover:text-teal-400 hover: transition duration-300 ease-in-out"
                                }
                            >
                                Alimentacion
                            </NavLink>
                        </PrivateRoute>

                        
                        <NavLink
                            onClick={handleLogout}
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
                            }
                        >
                            Cerrar Session
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default NavBarClient;