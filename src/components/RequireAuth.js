import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../store/auth/authSlice";

const RequireAuth = () => {
    const location = useLocation();
    const authtoken = useSelector(selectCurrentToken)

    return (
        authtoken
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;