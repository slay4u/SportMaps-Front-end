import useAuthentication from './useAuthentication'
import {api} from '../api/axiosInstances'
import {useLocation, useNavigate} from 'react-router-dom'

const useRefreshToken = () => {
    const {setState} = useAuthentication()
    const navigate = useNavigate()
    const location = useLocation()

    return async () => {
        try {
            const response = await api.put('/')
            setState(prev => ({...prev, token: response?.data}))
            return response?.data
        } catch (err) {
            navigate('/login', {state: {from: location}, replace: true})
            throw new Error(err?.response?.data)
        }
    }
}

export default useRefreshToken