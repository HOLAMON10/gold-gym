import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuAdmin from './componentesMenu/MenuAdmin' // Asegúrate de que el nombre coincide con el nombre del componente
import Login from './Components/LoginForm';
import PrivateRoute from "./Components/PrivateRoute";

function App() {

  return (

    <Router>
      <Routes>
        {/* Public route for the login page */}
        <Route path="/" element={<Login />} />

        {/* Private route for MenuAdmin page, only accessible if authenticated */}
        <Route
          path="/componentesMenu/MenuAdmin"
          element={<PrivateRoute element={MenuAdmin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
