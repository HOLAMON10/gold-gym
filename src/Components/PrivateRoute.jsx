import { Navigate } from 'react-router-dom';

function PrivateRoute({ element: Element, ...rest }) {
    // Check if the user is logged in by reading from sessionStorage
    const isAuthenticated = sessionStorage.getItem('isLoggedIn'); 
    const userRole = sessionStorage.getItem('role'); // Get the user's role from sessionStorage

    // If the user is authenticated and has the 'Empleado' role, render the component
    if (isAuthenticated && userRole === 'Empleado') {
        return <Element {...rest} />;
    } 

    // If the user is not authenticated or doesn't have the right role, redirect to login
    return <Navigate to="/" />;
}

export default PrivateRoute;