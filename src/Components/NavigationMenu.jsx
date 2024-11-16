import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Usaremos NavLink para la navegación

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
                    <h1 className="text-2xl font-bold text-white">Valerio Fitness</h1>
                    <div className="flex space-x-4">
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
                            }
                        >
                            Clientes
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
                            }
                        >
                            Ejercicios
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
                            }
                        >
                            Alimentacion
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
                            }
                        >
                            Perfil
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
                            }
                        >
                            Entrenadores
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
                            }
                        >
                            Feedback
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
                            }
                        >
                            Soporte
                        </NavLink>
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