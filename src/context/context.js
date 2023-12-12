import {createContext, useContext, useEffect, useMemo, useState} from 'react'

const StateContext = createContext(undefined)

const StateContextProvider = ({ children }) => {
    const [state, setState] = useState({
        token: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('refreshToken'),
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role'),
        username: localStorage.getItem('username')
    })

    useEffect(() => {
        localStorage.setItem('token', state.token)
        localStorage.setItem('refreshToken', state.refreshToken)
        localStorage.setItem('email', state.email)
        localStorage.setItem('role', state.role)
        localStorage.setItem('username', state.username)
    }, [state.token, state.role, state.refreshToken, state.email, state.username])

    const value = useMemo(() => ({
            state,
            setState
        }), [state.token, state.role, state.refreshToken, state.email, state.username])
    return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

const useStateContext = () => {
    const context = useContext(StateContext)
    if (context) return context
    throw new Error('useStateContext must be used within a StateContextProvider')
}

export { StateContextProvider, useStateContext }