import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuAdmin from './componentesMenu/MenuAdmin' // Asegúrate de que el nombre coincide con el nombre del componente
import Login from './Components/LoginForm';
import PrivateRoute from "./Components/PrivateRoute";
import MenuEjercicioAdmin from './componentesMenu/MenuEjercicioAdmin'
import MenuRecoAlimenAdmin from "./componentesMenu/MenuRecoAlimenAdmin";
import MenuAdminEmpleado from "./componentesMenu/MenuAdminEmpleado";

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
          path="/componentesMenu/MenuAdminEmpleado"
          element={
            <PrivateRoute>
              <MenuAdminEmpleado/>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
