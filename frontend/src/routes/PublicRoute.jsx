import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PublicRoute = () => {
    const { authUser } = useAuthStore();

    return !authUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;