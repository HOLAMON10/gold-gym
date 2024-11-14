import React from 'react';
import { NavLink,useNavigate  } from 'react-router-dom'; // Usaremos NavLink para la navegación

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
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-2xl font-bold text-indigo-600">Valerio Fitness</h1>
                    <div className="flex space-x-4">
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-indigo-600 font-bold" : "text-gray-600 hover:text-indigo-600"
                            }
                        >
                            Clientes
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-indigo-600 font-bold" : "text-gray-600 hover:text-indigo-600"
                            }
                        >
                            Ejercicios
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-indigo-600 font-bold" : "text-gray-600 hover:text-indigo-600"
                            }
                        >
                            Alimentacion
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-indigo-600 font-bold" : "text-gray-600 hover:text-indigo-600"
                            }
                        >
                            Perfil
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-indigo-600 font-bold" : "text-gray-600 hover:text-indigo-600"
                            }
                        >
                            Entrenadores
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-indigo-600 font-bold" : "text-gray-600 hover:text-indigo-600"
                            }
                        >
                            Feedback
                        </NavLink>
                        <NavLink
                            to="/componentesMenu/MenuAdmin"
                            className={({ isActive }) =>
                                isActive ? "text-indigo-600 font-bold" : "text-gray-600 hover:text-indigo-600"
                            }
                        >
                            Soporte
                        </NavLink>
                        <NavLink
                            onClick={handleLogout} 
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-indigo-600 font-bold" : "text-gray-600 hover:text-indigo-600"
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