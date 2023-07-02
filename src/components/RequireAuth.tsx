import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "../store/auth/authSlice";
import React from "react";

const RequireAuth = () => {
    const location = useLocation();
    const authToken = useSelector(selectCurrentToken);
    return authToken ? (<Outlet/>) : (<Navigate to="/signin" state={{from: location}} replace/>);
};

export default RequireAuth;
