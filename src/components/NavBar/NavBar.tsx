import React, {useEffect} from "react";
import {useLogoutMutation} from "../../store/auth/authApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectCurrentEmail, selectCurrentRefreshToken} from "../../store/auth/authSlice";
import logo from "../images/logo.svg";
import hamburger from "../images/icon-hamburger.svg";

export default function NavigationBar() {
    let primaryHeader : Element= null;
    let navToggle : Element = null;
    let primaryNav : Element = null;
    const email = useSelector(selectCurrentEmail);
    const refreshToken = useSelector(selectCurrentRefreshToken);
    const [logoutCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const logout = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        logoutCall({email, refreshToken});
        dispatch(logOut());
    };

    useEffect(() => {
        primaryHeader = document.querySelector(".primary-header");
        navToggle = document.querySelector(".mobile-nav-toggle");
        primaryNav = document.querySelector(".primary-navigation");
    }, []);

    const openMobileMenu = () => {
        navToggle.setAttribute("aria-expanded", String(!primaryNav.hasAttribute("data-visible")));
        primaryNav.toggleAttribute("data-visible");
        primaryHeader.toggleAttribute("data-overlay");
    };

    return (<header className="primary-header">
        <div className="navbar-container">
            <a href="/"><img src={logo} alt="SportMaps"/></a>
            <button className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded="false" onClick={openMobileMenu}>
                <img className="icon-hamburger" src={hamburger} alt="Open menu" aria-hidden="true"/>
                <span className="visually-hidden">Menu</span>
            </button>
            <nav className="primary-navigation" id="primary-navigation">
                <ul aria-label="Primary" role="list" className="nav-list">
                    <li><a href="/news">News</a></li>
                    <li><a href="/forums">Forums</a></li>
                    <li><a href="/events">Events</a></li>
                    <li><a href="/maps">Maps</a></li>
                    <li><a href="/coaches">Coaches</a></li>
                </ul>
            </nav>
            {refreshToken ? (<button className="navbar-button | display-sm-none display-md-inline-flex" onClick={logout}>
                <a href="/signin">Log Out</a>
            </button>) : (<button className="navbar-button | display-sm-none display-md-inline-flex">
                <a href="/signin">Sign In</a>
            </button>)}
        </div>
    </header>);
}
