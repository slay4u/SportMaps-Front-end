import useRefreshToken from './useRefreshToken'
import useAuthentication from './useAuthentication'
import {useEffect} from 'react'
import {authApi} from '../api/axiosInstances'

const useAuthApi = () => {
    const refresh = useRefreshToken()
    const {state} = useAuthentication()

    useEffect(() => {
        const requestIntercept = authApi.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'])
                    config.headers['Authorization'] = `Bearer ${state?.token}`
                return config
            }, error => Promise.reject(error)
        )

        const responseIntercept = authApi.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error?.config
                if (error?.response?.status === 406 && !originalRequest?.sent) {
                    originalRequest.sent = true
                    const newToken = await refresh()
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                    return authApi(originalRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            authApi.interceptors.request.eject(requestIntercept)
            authApi.interceptors.response.eject(responseIntercept)
        }
    }, [state, refresh])

    return authApi
}

export default useAuthApi