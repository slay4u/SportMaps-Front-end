import React from "react";
import {Link} from "react-router-dom";
import {useLogoutMutation} from "../../store/auth/authApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectCurrentEmail, selectCurrentRefreshToken} from "../../store/auth/authSlice";
import "./navbar.css";

export default function NavigationBar() {
    const email = useSelector(selectCurrentEmail);
    const refreshToken = useSelector(selectCurrentRefreshToken);
    const [logoutCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const logout = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        logoutCall({email, refreshToken});
        dispatch(logOut());
    };

    return (<>
        <div className="navbar-container">
            <Link className="navbar-element" to="/about" reloadDocument>
                About us
            </Link>
            <Link className="navbar-element" to="/chat" reloadDocument>
                ChatRoom
            </Link>
            <Link className="navbar-element" to="/maps" reloadDocument>
                Maps
            </Link>
            <Link className="navbar-element" to="/forums" reloadDocument>
                Forums
            </Link>
            <Link className="navbar-element" to="/" reloadDocument>
                SportMaps
            </Link>
            <Link className="navbar-element" to="/news" reloadDocument>
                News
            </Link>
            <Link className="navbar-element" to="/coaches" reloadDocument>
                Coaches
            </Link>
            <Link className="navbar-element" to="/events" reloadDocument>
                Events
            </Link>
            <Link className="navbar-element" to="/profile" reloadDocument>
                Profile
            </Link>
            {refreshToken ? (<button className="navbar-button" onClick={logout}>
                <Link className="navbar-button-element" to="/signin" reloadDocument>
                    Log Out
                </Link>
            </button>) : (<button className="navbar-button">
                <Link className="navbar-button-element" to="/signin" reloadDocument>
                    Sign In
                </Link>
            </button>)}
        </div>
    </>);
}
