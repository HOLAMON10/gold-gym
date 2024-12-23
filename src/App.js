import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";

import Contacto from "./componentesMenu/Contacto";
import MenuAdminEmpleado from "./componentesMenu/MenuAdminEmpleado";


// Lazy-loaded components
const Login = lazy(() => import('./Components/LoginForm'));
const MenuAdmin = lazy(() => import('./componentesMenu/MenuAdmin'));
const MenuEjercicioAdmin = lazy(() => import('./componentesMenu/MenuEjercicioAdmin'));
const MenuRecoAlimenAdmin = lazy(() => import('./componentesMenu/MenuRecoAlimenAdmin'));
const NutritionGuide = lazy(() => import('./componentesMenu/DietaClient'));
const Dashboard = lazy(() => import('./componentesMenu/MenuPrincipalCliente'));
const UserProfile = lazy(() => import('./componentesMenu/PerfilUsuarioCliente'));
const Rutinas = lazy(() => import('./componentesMenu/RutinasClient'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-teal-500 rounded-full animate-spin"></div>
  </div>
);


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
     

      <Routes>
        <Route 
          path="/" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          } 
        />

        <Route
          path="/componentesMenu/MenuAdmin"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <MenuAdmin />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/componentesMenu/MenuAdminEmpleado"
          element={
            <PrivateRoute>
              <MenuAdminEmpleado />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/componentesMenu/MenuEjercicioAdmin"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <MenuEjercicioAdmin />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/componentesMenu/MenuRecoAlimenAdmin"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <MenuRecoAlimenAdmin />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/componentesMenu/DietaClient"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <NutritionGuide />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/componentesMenu/MenuPrincipalCliente"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Dashboard />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/componentesMenu/PerfilUsuarioCliente"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <UserProfile />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/componentesMenu/RutinasClient"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Rutinas />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/componentesMenu/Contacto"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Contacto />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
