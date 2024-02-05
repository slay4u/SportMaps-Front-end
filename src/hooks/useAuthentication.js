import {useContext} from 'react'
import AuthenticationContext from '../context/AuthenticationProvider'

const useAuthentication = () => {
    const context = useContext(AuthenticationContext)
    if (context) return context
    throw new Error('useAuthentication must be used within AuthenticationProvider')
}

export default useAuthentication