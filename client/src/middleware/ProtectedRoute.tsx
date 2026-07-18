import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser } from "../utils/authStorage.utils";

const ProtectedRoute = () => {
    const token = getToken();
    const user = getUser();

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute