import React, {useEffect} from 'react'
import logo from '../../assets/logo.svg'
import {useAuthentication} from '../../context/context'
import {logoutFn} from '../../api/authApi'
import {Menu} from "@mui/icons-material";

export default function NavigationBar() {
    let primaryHeader, navToggle, primaryNav = null
    const {state, setState} = useAuthentication()
    const refreshToken = state.refreshToken

    async function logout(e) {
        e.preventDefault()
        await logoutFn(refreshToken)
        setState({})
    }

    useEffect(() => {
        primaryHeader = document.querySelector('.primary-header')
        navToggle = document.querySelector('.mobile-nav-toggle')
        primaryNav = document.querySelector('.primary-navigation')
    }, [])

    const openMobileMenu = () => {
        navToggle.setAttribute("aria-expanded", String(!primaryNav.hasAttribute("data-visible")))
        primaryNav.toggleAttribute("data-visible")
        primaryHeader.toggleAttribute("data-overlay")
    }

    return <header className="primary-header">
        <div className="navbar-container">
            <a href="/"><img src={logo} alt="SportMaps"/></a>
            <button className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded="false" onClick={openMobileMenu}>
                <Menu/>
                <span className="visually-hidden">Menu</span>
            </button>
            <nav className="primary-navigation" id="primary-navigation">
                <ul aria-label="Primary" role="list" className="nav-list">
                    <li><a href="/">News</a></li>
                    <li><a href="/forums">Forums</a></li>
                    <li><a href="/events">Events</a></li>
                    <li><a href="/maps">Maps</a></li>
                    <li><a href="/coaches">Coaches</a></li>
                </ul>
            </nav>
            {refreshToken ? (<button className="navbar-button | display-sm-none display-md-inline-flex" onClick={logout}>
                <a href="/login">Log Out</a>
            </button>) : (<button className="navbar-button | display-sm-none display-md-inline-flex">
                <a href="/login">Sign In</a>
            </button>)}
        </div>
    </header>
}
