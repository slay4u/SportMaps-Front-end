import React from "react";
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
            <a className="navbar-element" href="/about">About us</a>
            <a className="navbar-element" href="/chat">ChatRoom</a>
            <a className="navbar-element" href="/maps">Maps</a>
            <a className="navbar-element" href="/forums">Forums</a>
            <a className="navbar-element" href="/">SportMaps</a>
            <a className="navbar-element" href="/news">News</a>
            <a className="navbar-element" href="/coaches">Coaches</a>
            <a className="navbar-element" href="/events">Events</a>
            <a className="navbar-element" href="/profile">Profile</a>
            {refreshToken ? (<button className="navbar-button" onClick={logout}>
                <a className="navbar-button-element" href="/signin">Log Out</a>
            </button>) : (<button className="navbar-button">
                <a className="navbar-button-element" href="/signin">Sign In</a>
            </button>)}
        </div>
    </>);
}
