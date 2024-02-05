import {createContext, useState} from 'react'

const AuthenticationContext = createContext({})

export const AuthenticationProvider = ({children}) => {
    const [state, setState] = useState({
        email: '', role: '', username: '', token: ''
    })

    return <AuthenticationContext.Provider value={{state, setState}}>{children}</AuthenticationContext.Provider>
}

export default AuthenticationContext