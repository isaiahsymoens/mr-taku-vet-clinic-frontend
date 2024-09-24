import {Navigate} from "react-router-dom";
import {isAuthenticated} from "../utils/auth";

interface ProtectedRouteProps {
    element: React.ReactElement;
} 

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({element}) => {
    const isUserAuthenticated = isAuthenticated();
    return isUserAuthenticated ? element : <Navigate to="/login" />
}

export default ProtectedRoute;