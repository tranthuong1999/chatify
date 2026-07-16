import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PrivateRoute = () => {
    const { authUser } = useAuthStore();

    return authUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;