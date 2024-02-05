import React, {useEffect} from 'react'
import logo from '../../assets/logo.svg'
import useAuthentication from '../../hooks/useAuthentication'
import {logoutFn} from '../../api/api'
import {Menu} from '@mui/icons-material'
import {Link} from 'react-router-dom'

export default function NavigationBar() {
    let primaryHeader, navToggle, primaryNav = null
    const {state, setState} = useAuthentication()

    async function logout(e) {
        e.preventDefault()
        try {
            await logoutFn()
            setState({})
        } catch (err) {
            setState({})
        }
    }

    useEffect(() => {
        primaryHeader = document.querySelector('.primary-header')
        navToggle = document.querySelector('.mobile-nav-toggle')
        primaryNav = document.querySelector('.primary-navigation')
    }, [])

    const openMobileMenu = () => {
        navToggle.setAttribute('aria-expanded', String(!primaryNav.hasAttribute('data-visible')))
        primaryNav.toggleAttribute('data-visible')
        primaryHeader.toggleAttribute('data-overlay')
    }

    return <header className='primary-header'>
        <div className='navbar-container'>
            <Link to='/'><img src={logo} alt='SportMaps'/></Link>
            <button className='mobile-nav-toggle' aria-controls='primary-navigation' aria-expanded='false' onClick={openMobileMenu}>
                <Menu/>
                <span className='visually-hidden'>Menu</span>
            </button>
            <nav className='primary-navigation' id='primary-navigation'>
                <ul aria-label='Primary' role='list' className='nav-list'>
                    <li><Link to='/'>News</Link></li>
                    <li><Link to='/forums'>Forums</Link></li>
                    <li><Link to='/events'>Events</Link></li>
                    <li><Link to='/maps'>Maps</Link></li>
                    <li><Link to='/coaches'>Coaches</Link></li>
                </ul>
            </nav>
            {state.token ? <button className='navbar-button | display-sm-none display-md-inline-flex' onClick={logout}>
                <Link to='/login' reloadDocument>Log Out</Link>
            </button> : <button className='navbar-button | display-sm-none display-md-inline-flex'>
                <Link to='/login' reloadDocument>Sign In</Link>
            </button>}
        </div>
    </header>
}
