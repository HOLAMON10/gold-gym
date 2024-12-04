import { Navigate, useLocation  } from 'react-router-dom';
//import RoleAccess from '../configs/roleAcces,js';

function PrivateRoute({ allowedRoles, children } ) {
    // Check if the user is logged in by reading from sessionStorage
    const isAuthenticated = localStorage.getItem('isLoggedIn'); 
    const userRole = localStorage.getItem('role'); // Get the user's role from sessionStorage
    const location = useLocation();

   
    
    
    if (!isAuthenticated) {
        console.log("User not authenticated, redirecting to login");
        return <Navigate to="/" />;
    }

    // Check if the user's role has access to the current path
    const RoleAccess = {
        "Admin": ["/componentesMenu/MenuAdmin", "/"],
        "Cliente": ["/componentesMenu/DietaClient","/componentesMenu/MenuPrincipalCliente","/componentesMenu/PerfilUsuarioCliente","/componentesMenu/RutinasClient","/componentesMenu/Contacto"],
        "Empleado": ["/componentesMenu/MenuAdmin", "/componentesMenu/MenuRecoAlimenAdmin", "/componentesMenu/MenuEjercicioAdmin" , "/componentesMenu/MenuAdminEmpleado"],
    }
    const allowedPathsForRole = RoleAccess[userRole];
   
    
   
    // If the role is not in RoleAccess or doesn't have access to the current path, redirect
    if (!allowedPathsForRole || !allowedPathsForRole.includes(location.pathname)) {
        console.log("User role does not have access to this path, redirecting to login");
        return <Navigate to="/" />;
    }

    
    console.log("Access granted to:", location.pathname);
    return children;
}

export default PrivateRoute;