import React from "react";
import NavBarClient from "../Components/NavigationMenuClient";

const Rutinas = () => {
    return (
        <div>
            <NavBarClient />
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Section: Pecho */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Pecho</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Exercise Card 1 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gray-200">
                                <img
                                    src="/api/placeholder/400/300"
                                    alt="Press de banca"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Press de Banca</h3>
                                <p className="text-gray-600">
                                    Ejercicio compuesto que trabaja principalmente el pecho mayor,
                                    tríceps y hombros anteriores.
                                </p>
                                <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                                    Ver detalles →
                                </button>
                            </div>
                        </div>

                        {/* Exercise Card 2 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gray-200">
                                <img
                                    src="/api/placeholder/400/300"
                                    alt="Aperturas con mancuernas"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Aperturas con Mancuernas
                                </h3>
                                <p className="text-gray-600">
                                    Ejercicio de aislamiento que se centra en el desarrollo y
                                    estiramiento del pecho.
                                </p>
                                <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                                    Ver detalles →
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Espalda */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Espalda</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Exercise Card 1 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gray-200">
                                <img
                                    src="/api/placeholder/400/300"
                                    alt="Dominadas"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Dominadas</h3>
                                <p className="text-gray-600">
                                    Ejercicio compuesto que trabaja la espalda superior y los
                                    músculos del core.
                                </p>
                                <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                                    Ver detalles →
                                </button>
                            </div>
                        </div>

                        {/* Exercise Card 2 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gray-200">
                                <img
                                    src="/api/placeholder/400/300"
                                    alt="Remo con barra"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Remo con Barra</h3>
                                <p className="text-gray-600">
                                    Ejercicio que fortalece los músculos de la espalda media y
                                    baja.
                                </p>
                                <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                                    Ver detalles →
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Load More Button */}
                <div className="text-center mt-8">
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Cargar más ejercicios
                    </button>
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


export default Rutinas;
