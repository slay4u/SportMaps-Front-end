import React, {useEffect, useRef, useState} from 'react'
import {LockPersonOutlined} from '@mui/icons-material'
import './user.css'
import {signupFn} from '../../api/api'
import {useNavigate} from "react-router-dom";

const USERNAME_REGEXP = /^(?=.{2,30}$)[A-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/
const PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[{}:#@!;[_'`\],"./~?*\-$^+=\\<>]).{8,20}$/
const EMAIL_REGEXP = /^(?=.{1,32}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/

export default function SignUp() {
    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState({
        firstName: '', lastName: '', email: '', password: ''
    })
    const [valid, setValid] = useState({
        firstName: false, lastName: false, email: false, password: false
    })
    const [firstNameFocus, setFirstNameFocus] = useState(false)
    const [lastNameFocus, setLastNameFocus] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setValid({
            firstName: USERNAME_REGEXP.test(user.firstName),
            lastName: USERNAME_REGEXP.test(user.lastName),
            email: EMAIL_REGEXP.test(user.email),
            password: PASSWORD_REGEXP.test(user.password)
        })
        setError('')
    }, [user.firstName, user.lastName, user.email, user.password])

    function handleChange(e) {
        setUser(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const v1 = USERNAME_REGEXP.test(user.firstName)
        const v2 = USERNAME_REGEXP.test(user.lastName)
        const v3 = EMAIL_REGEXP.test(user.email)
        const v4 = PASSWORD_REGEXP.test(user.password)
        if (!v1 || !v2 || !v3 || !v4) {
            setError('Invalid entry.')
            return
        }
        try {
            await signupFn(user)
            navigate('/login')
        } catch (err) {
            setError('Error occurred.')
            errRef.current.focus()
        }
    }

    return <main className='center-container sign-container'>
        <section className='signUserFormContainer'>
            <p ref={errRef} className={error ? 'instructions' : 'visually-hidden'} aria-live='assertive'>{error}</p>
            <div className='signUserFormAvatar'>
                <LockPersonOutlined sx={{fontSize: '2.5rem'}}/>
            </div>
            <h4>Sign Up</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor='firstName'>First Name</label>
                <input
                    id='firstName'
                    required
                    ref={userRef}
                    type='text'
                    autoComplete='off'
                    name='firstName'
                    onChange={handleChange}
                    aria-invalid={valid.firstName ? 'false' : 'true'}
                    aria-describedby='first-name-note'
                    onFocus={() => setFirstNameFocus(true)}
                    onBlur={() => setFirstNameFocus(false)}
                />
                <h5 id='first-name-note'
                    className={firstNameFocus && user.firstName && !valid.firstName ? 'instructions' : 'visually-hidden'}>
                    Provide valid name, please.
                </h5>
                <label htmlFor='lastName'>Last Name</label>
                <input
                    id='lastName'
                    required
                    type='text'
                    autoComplete='off'
                    name='lastName'
                    onChange={handleChange}
                    aria-invalid={valid.lastName ? 'false' : 'true'}
                    aria-describedby='last-name-note'
                    onFocus={() => setLastNameFocus(true)}
                    onBlur={() => setLastNameFocus(false)}
                />
                <h5 id='last-name-note'
                    className={lastNameFocus && user.lastName && !valid.lastName ? 'instructions' : 'visually-hidden'}>
                    Provide valid name, please.
                </h5>
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    required
                    type='text'
                    autoComplete='off'
                    name='email'
                    onChange={handleChange}
                    aria-invalid={valid.email ? 'false' : 'true'}
                    aria-describedby='email-note'
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <h5 id='email-note'
                    className={emailFocus && user.email && !valid.email ? 'instructions' : 'visually-hidden'}>
                    Provide valid email, please.
                </h5>
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    required
                    type='password'
                    name='password'
                    onChange={handleChange}
                    aria-invalid={valid.password ? 'false' : 'true'}
                    aria-describedby='password-note'
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                <h5 id='password-note'
                    className={passwordFocus && user.password && !valid.password ? 'instructions' : 'visually-hidden'}>
                    Password must contain letters, numbers and special symbols. Should be at least 8 characters
                    long.
                </h5>
                <button className='signUserFormButton'
                    disabled={!valid.firstName || !valid.lastName || !valid.email || !valid.password}
                >
                    Sign Up
                </button>
            </form>
            <div className='signUserFormLinkContaine'>
                <a href='/login'><h5>Already have an account? Sign in</h5></a>
            </div>
        </section>
    </main>
}
