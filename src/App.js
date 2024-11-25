import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuAdmin from './componentesMenu/MenuAdmin' // Asegúrate de que el nombre coincide con el nombre del componente
import Login from './Components/LoginForm';
import PrivateRoute from "./Components/PrivateRoute";
import MenuEjercicioAdmin from './componentesMenu/MenuEjercicioAdmin'
import MenuRecoAlimenAdmin from "./componentesMenu/MenuRecoAlimenAdmin";
import NutritionGuide from "./componentesMenu/DietaClient";
import Dashboard from "./componentesMenu/MenuPrincipalCliente";
import UserProfile from "./componentesMenu/PerfilUsuarioCliente";

function App() {

  return (

    <Router>
      
      <Routes>
      
        {/* Public route for the login page */}
        <Route path="/" element={<Login />} />

        {/* Private route for MenuAdmin page, only accessible if authenticated */}
        <Route
          path="/componentesMenu/MenuAdmin"
          element={
            <PrivateRoute>
              <MenuAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/componentesMenu/MenuEjercicioAdmin"
          element={
            <PrivateRoute>
              <MenuEjercicioAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/componentesMenu/MenuRecoAlimenAdmin"
          element={
            <PrivateRoute>
              <MenuRecoAlimenAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/componentesMenu/DietaClient"
          element={
            <PrivateRoute>
              <NutritionGuide />
            </PrivateRoute>
          }
        />
        <Route
          path="/componentesMenu/MenuPrincipalCliente"
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />
        <Route
          path="/componentesMenu/PerfilUsuarioCliente"
          element={
            <PrivateRoute>
              <UserProfile/>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
