import { Routes, Route } from "react-router-dom";

import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<ChatPage />} />
            </Route>

            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;