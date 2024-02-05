import React, {useEffect, useRef, useState} from 'react'
import {LoginOutlined} from '@mui/icons-material'
import {useLocation, useNavigate} from 'react-router-dom'
import './user.css'
import {loginFn} from '../../api/api'
import useAuthentication from '../../hooks/useAuthentication'
import {jwtDecode} from 'jwt-decode'

export default function SignIn() {
    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState({
        email: '', password: ''
    })
    const [error, setError] = useState('')
    const {setState} = useAuthentication()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setError('')
    }, [user.email, user.password])

    function handleChange(e) {
        setUser(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const data = await loginFn(user)
            const {sub, role, iss} = jwtDecode(data)
            setState({
                email: sub,
                role: role,
                username: iss,
                token: data
            })
            navigate(from, {replace: true})
        } catch (err) {
            setError('Error occurred.')
            errRef.current.focus()
        }
    }

    return <main className='center-container sign-container'>
        <section className='signUserFormContainer'>
            <p ref={errRef} className={error ? 'instructions' : 'visually-hidden'} aria-live='assertive'>{error}</p>
            <div className='signUserFormAvatar'>
                <LoginOutlined sx={{fontSize: '2.5rem'}}/>
            </div>
            <h4>Sign In</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input id='email' required type='text' autoComplete='off' ref={userRef} name='email' onChange={handleChange}/>
                <label htmlFor='password'>Password</label>
                <input id='password' required type='password' name='password' onChange={handleChange}/>
                <button className='signUserFormButton'>Sign In</button>
            </form>
            <div className='signUserFormLinkContainer'>
                <a href='/signup'><h5>Don't have an account? Sign up</h5></a>
            </div>
        </section>
    </main>
}
