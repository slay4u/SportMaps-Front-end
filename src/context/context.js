import {createContext, useContext, useEffect, useMemo, useState} from 'react'

const AuthenticationContext = createContext({})

const AuthenticationProvider = ({children}) => {
    const [state, setState] = useState({
        token: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('refreshToken'),
        username: localStorage.getItem('username')
    })

    useEffect(() => {
        localStorage.setItem('token', state.token)
        localStorage.setItem('refreshToken', state.refreshToken)
        localStorage.setItem('username', state.username)
    }, [state.token, state.refreshToken, state.username])

    const value = useMemo(() => ({state, setState}), [state])
    return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

const useAuthentication = () => {
    const context = useContext(AuthenticationContext)
    if (context) return context
    throw new Error('useAuthentication must be used within AuthenticationProvider')
}

export {AuthenticationProvider, useAuthentication}