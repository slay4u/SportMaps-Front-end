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
            <a href="/about">About us</a>
            <a href="/chat">ChatRoom</a>
            <a href="/maps">Maps</a>
            <a href="/forums">Forums</a>
            <a href="/"><h4>SportMaps</h4></a>
            <a href="/news">News</a>
            <a href="/coaches">Coaches</a>
            <a href="/events">Events</a>
            <a href="/profile">Profile</a>
            {refreshToken ? (<button className="navbar-button" onClick={logout}>
                <a href="/signin">Log Out</a>
            </button>) : (<button className="navbar-button">
                <a href="/signin">Sign In</a>
            </button>)}
        </div>
    </>);
}
