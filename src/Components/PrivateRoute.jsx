import { Navigate } from 'react-router-dom';

function PrivateRoute({ element: Element, ...rest }) {
    const isAuthenticated = sessionStorage.getItem('isLoggedIn'); // Check if the user is logged in
    const userRole = sessionStorage.getItem('role');

    if (isAuthenticated && userRole === 'Empleado') {
        return <Element {...rest} />;
    } else if (isAuthenticated && userRole === 'Cliente') {
        // Redirect Clientes to their own page (or handle accordingly)
        return <Navigate to="/pantallaclientes/menucliente.html" />;
    }

    // Redirect to login if not authenticated
    return <Navigate to="/" />;
}

export default PrivateRoute;