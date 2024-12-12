import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import './NavBarClient.css'; // Include custom CSS for spinner and transitions

function NavBarClient() {
    const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle the menu open/close
    };

    return (
        <nav className="bg-[#3D3E3D] shadow-lg loaded">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo or Brand Name */}
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider hover:text-teal-400 transition duration-300 ease-in-out">
                        Flex Fitness
                    </h1>

                    {/* Hamburger Menu for smaller screens */}
                    <div className="flex md:hidden">
                        <button 
                            onClick={toggleMenu} // Toggle the menu on button click
                            className="text-gray-400 focus:outline-none focus:text-white transition">
                            {/* Icon for menu */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6">
                        <PrivateRoute>
                            <NavLink
                                to="/componentesMenu/MenuPrincipalCliente"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-white font-semibold border-b-2 border-teal-400"
                                        : "text-gray-300 hover:text-teal-400 transition duration-300 ease-in-out"
                                }
                            >
                                Dashboard
                            </NavLink>
                        </PrivateRoute>
                        <PrivateRoute>
                            <NavLink
                                to="/componentesMenu/DietaClient"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-white font-semibold border-b-2 border-teal-400"
                                        : "text-gray-300 hover:text-teal-400 transition duration-300 ease-in-out"
                                }
                            >
                                Alimentación
                            </NavLink>
                        </PrivateRoute>
                        <PrivateRoute>
                            <NavLink
                                to="/componentesMenu/RutinasClient"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-white font-semibold border-b-2 border-teal-400"
                                        : "text-gray-300 hover:text-teal-400 transition duration-300 ease-in-out"
                                }
                            >
                                Ejercicios
                            </NavLink>
                        </PrivateRoute>
                        <PrivateRoute>
                            <NavLink
                                to="/componentesMenu/PerfilUsuarioCliente"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-white font-semibold border-b-2 border-teal-400"
                                        : "text-gray-300 hover:text-teal-400 transition duration-300 ease-in-out"
                                }
                            >
                                Perfil
                            </NavLink>
                        </PrivateRoute>
                        <PrivateRoute>
                            <NavLink
                                to="/componentesMenu/Contacto"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-white font-semibold border-b-2 border-teal-400"
                                        : "text-gray-300 hover:text-teal-400 transition duration-300 ease-in-out"
                                }
                            >
                                Contacto
                            </NavLink>
                        </PrivateRoute>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Menu for mobile screens (Right Side Slide-In) */}
            <div
                className={`md:hidden fixed top-0 right-0 w-48 bg-[#3D3E3D] h-full z-50 transform transition-transform ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={toggleMenu} className="text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="space-y-6 px-4 pt-8">
                <PrivateRoute>
                    <NavLink
                        to="/componentesMenu/MenuPrincipalCliente"
                        className="block text-white hover:text-teal-400 text-lg font-medium"
                    >
                        Dashboard
                    </NavLink>
                    </PrivateRoute>
                    <PrivateRoute>
                    <NavLink
                        to="/componentesMenu/DietaClient"
                        className="block text-white hover:text-teal-400 text-lg font-medium"
                    >
                        Alimentación
                    </NavLink>
                    </PrivateRoute>
                    <PrivateRoute>
                    <NavLink
                        to="/componentesMenu/RutinasClient"
                        className="block text-white hover:text-teal-400 text-lg font-medium"
                    >
                        Ejercicios
                    </NavLink>
                    </PrivateRoute>
                    <PrivateRoute>
                    <NavLink
                        to="/componentesMenu/Contacto"
                        className="block text-white hover:text-teal-400 text-lg font-medium"
                    >
                        Contacto
                    </NavLink>
                    </PrivateRoute>
                    <PrivateRoute>
                    <NavLink
                        to="/componentesMenu/PerfilUsuarioCliente"
                        className="block text-white hover:text-teal-400 text-lg font-medium"
                    >
                        Perfil
                    </NavLink>
                    </PrivateRoute>
                    <button
                        onClick={handleLogout}
                        className="block text-white hover:text-teal-400 text-lg font-medium"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBarClient;
