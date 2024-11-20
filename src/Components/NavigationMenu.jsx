import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Usaremos NavLink para la navegación
import PrivateRoute from './PrivateRoute';


function NavBar() {
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
                                to="/componentesMenu/MenuAdmin"
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold border-b-2 border-teal-400"
                : "text-gray-300 hover:text-teal-400 hover: transition duration-300 ease-in-out"
                                }
                            >
                                Clientes
                            </NavLink>
                        </PrivateRoute>

                        <PrivateRoute>
                            <NavLink
                                to="/componentesMenu/MenuEjercicioAdmin"
                                className={({ isActive }) =>
                                    isActive ? "text-white font-semibold border-b-2 border-teal-400"
                : "text-gray-300 hover:text-teal-400 hover: transition duration-300 ease-in-out"
                                }
                            >
                                Ejercicios
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

                        <PrivateRoute>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-white font-semibold border-b-2 border-teal-400"
                : "text-gray-300 hover:text-teal-400 hover: transition duration-300 ease-in-out"
                            }
                        >
                            Perfil
                        </NavLink>
                        </PrivateRoute>
                        <PrivateRoute>  
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-white font-semibold border-b-2 border-teal-400"
                : "text-gray-300 hover:text-teal-400 hover: transition duration-300 ease-in-out"
                            }
                        >
                            Entrenadores
                        </NavLink>
                        </PrivateRoute>
                        <PrivateRoute>  
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-white font-semibold border-b-2 border-teal-400"
                : "text-gray-300 hover:text-teal-400 hover: transition duration-300 ease-in-out"
                            }
                        >
                            Feedback
                        </NavLink>
                        </PrivateRoute>
                        <PrivateRoute>  
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-white font-semibold border-b-2 border-teal-400"
                : "text-gray-300 hover:text-teal-400 hover: transition duration-300 ease-in-out"
                            }
                        >
                            Soporte
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

export default NavBar;