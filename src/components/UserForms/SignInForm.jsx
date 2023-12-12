import React, { useRef } from 'react'
import {LoginOutlined} from '@mui/icons-material'
import {useLocation, useNavigate} from 'react-router-dom'
import './user.css'
import {loginFn} from '../../api/authApi'
import {useStateContext} from '../../context/context'

export default function SignIn() {
    const email = useRef(null)
    const password = useRef(null)
    const {setState} = useStateContext()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname || '/'
    
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const data = await loginFn('/login', {email: email.current.value, password: password.current.value})
            setState({
                token: data.token,
                refreshToken: data.refreshToken,
                email: email.current.value,
                role: data.role,
                username: data.username
            })
            navigate(from, {replace: true})
        } catch (err) {
            alert(err)
        }
    }

    return <main className="center-container sign-container">
        <div className="signUserFormContainer">
            <div className="signUserFormAvatar">
                <LoginOutlined sx={{fontSize: "2.5rem"}}/>
            </div>
            <h4>Sign In</h4>
            <div className="sign-input-container">
                <input
                    required
                    type="text"
                    autoComplete="off"
                    ref={email}
                />
                <label>Email</label>
            </div>
            <div className="sign-input-container">
                <input
                    required
                    type="password"
                    autoComplete="off"
                    ref={password}
                />
                <label>Password</label>
            </div>
            <button
                className="signUserFormButton"
                type="submit"
                onClick={handleSubmit}
            >
                Sign In
            </button>
            <div className="signUserFormLinkContainer">
                <a href="/signup"><h5>Don&apos;t have an account? Sign up</h5></a>
            </div>
        </div>
    </main>
}
