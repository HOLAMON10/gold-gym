import { Navigate, useLocation  } from 'react-router-dom';
//import RoleAccess from '../configs/roleAcces,js';

function PrivateRoute({ allowedRoles, children } ) {
    // Check if the user is logged in by reading from sessionStorage
    const isAuthenticated = sessionStorage.getItem('isLoggedIn'); 
    const userRole = sessionStorage.getItem('role'); // Get the user's role from sessionStorage
    const location = useLocation();

    console.log("Current Path:", location.pathname);
    console.log("Is Authenticated:", isAuthenticated);
    console.log("User Role:", userRole);
    
    if (!isAuthenticated) {
        console.log("User not authenticated, redirecting to login");
        return <Navigate to="/" />;
    }

    // Check if the user's role has access to the current path
    const RoleAccess = {
        "Admin": ["/componentesMenu/MenuAdmin", "/"],
        "Empleado": ["/componentesMenu/MenuAdmin", "/componentesMenu/MenuRecoAlimenAdmin", "/componentesMenu/MenuEjercicioAdmin"],
        "Client": ["/"]
    };
    const allowedPathsForRole = RoleAccess[userRole];
   
    console.log(RoleAccess);
    console.log(typeof(RoleAccess))
    for (let role in RoleAccess) {
        console.log('Role:', role);
        console.log('Allowed Paths:', RoleAccess[role]);
    }
   
    // If the role is not in RoleAccess or doesn't have access to the current path, redirect
    if (!allowedPathsForRole || !allowedPathsForRole.includes(location.pathname)) {
        console.log("User role does not have access to this path, redirecting to login");
        return <Navigate to="/" />;
    }

    
    console.log("Access granted to:", location.pathname);
    return children;
}

export default PrivateRoute;