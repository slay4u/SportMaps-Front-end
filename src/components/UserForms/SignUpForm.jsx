import React, {useEffect, useState} from 'react'
import {LockPersonOutlined} from '@mui/icons-material'
import './user.css'
import {signupFn} from '../../api/authApi'

const USERNAME_REGEXP = /^(?=.{2,30}$)[A-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/
const PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[{}:#@!;[_'`\],"./~?*\-$^+=\\<>]).{8,20}$/
const EMAIL_REGEXP = /^(?=.{1,32}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/

export default function SignUp() {
    const [user, setUser] = useState({
        firstName: '', lastName: '', email: '', password: ''
    })
    const [valid, setValid] = useState({
        firstName: false, lastName: false, email: false, password: false
    })

    useEffect(() => {
        setValid({
            firstName: USERNAME_REGEXP.test(user.firstName),
            lastName: USERNAME_REGEXP.test(user.lastName),
            email: EMAIL_REGEXP.test(user.email),
            password: PASSWORD_REGEXP.test(user.password)
        })
    }, [user.firstName, user.lastName, user.email, user.password])

    function handleChange(e) {
      setUser(prev=> ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await signupFn('/signup', user)
            window.location.href = '/login'
        } catch (err) {
            alert(err)
        }
    }

    return <main className="center-container sign-container">
        <div className="signUserFormContainer">
            <div className="signUserFormAvatar">
                <LockPersonOutlined sx={{fontSize: "2.5rem"}}/>
            </div>
            <h4>Sign Up</h4>
            <div className="sign-input-container">
                <input
                    required
                    type="text"
                    autoComplete="off"
                    name="firstName"
                    onChange={handleChange}
                />
                <label>First Name</label>
                <h5 className={user.firstName && !valid.firstName ? "instructions" : "visually-hidden"}>
                    Provide valid name, please.
                </h5>
            </div>
            <div className="sign-input-container">
                <input
                    required
                    type="text"
                    autoComplete="off"
                    name="lastName"
                    onChange={handleChange}
                />
                <label>Last Name</label>
                <h5 className={user.lastName && !valid.lastName ? "instructions" : "visually-hidden"}>
                    Provide valid name, please.
                </h5>
            </div>
            <div className="sign-input-container">
                <input
                    required
                    type="text"
                    autoComplete="off"
                    name="email"
                    onChange={handleChange}
                />
                <label>Email</label>
                <h5 className={user.email && !valid.email ? "instructions" : "visually-hidden"}>
                    Provide valid email, please.
                </h5>
            </div>
            <div className="sign-input-container">
                <input
                    required
                    type="password"
                    autoComplete="off"
                    name="password"
                    onChange={handleChange}
                />
                <label>Password</label>
                <h5 className={user.password && !valid.password ? "instructions" : "visually-hidden"}>
                    Password must contain letters, numbers and special symbols. Should be at least 8 characters
                    long.
                </h5>
            </div>
            <button
                type="submit"
                className="signUserFormButton"
                disabled={!valid.firstName || !valid.lastName || !valid.email || !valid.password}
                onClick={handleSubmit}
            >
                Sign Up
            </button>
            <div className="signUserFormLinkContainer">
                <a href="/login"><h5>Already have an account? Sign in</h5></a>
            </div>
        </div>
    </main>
}
