import useAuthentication from './useAuthentication'
import {api} from '../api/axiosInstances'
import {useLocation, useNavigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const useRefreshToken = () => {
    const {setState} = useAuthentication()
    const navigate = useNavigate()
    const location = useLocation()

    return async () => {
        let response
        try {
            response = await api.put('/')
            console.log(response.data)
            const decoded = jwtDecode(response)
            console.log(decoded)
            setState({token: response?.data})
        } catch (err) {
            // navigate('/login', {state: {from: location}, replace: true})
            console.log(err)
        }
        return response?.data
    }
}

export default useRefreshToken