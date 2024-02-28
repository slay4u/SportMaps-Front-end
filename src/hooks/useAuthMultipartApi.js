import useRefreshToken from './useRefreshToken'
import useAuthentication from './useAuthentication'
import {useEffect} from 'react'
import {authMultipartApi} from '../api/axiosInstances'

const useAuthMultipartApi = () => {
    const refresh = useRefreshToken()
    const {state} = useAuthentication()

    useEffect(() => {
        const requestIntercept = authMultipartApi.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'])
                    config.headers['Authorization'] = `Bearer ${state?.token}`
                return config
            }, error => Promise.reject(error)
        )

        const responseIntercept = authMultipartApi.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error?.config
                if (error?.response?.status === 406 && !originalRequest?.sent) {
                    originalRequest.sent = true
                    const newToken = await refresh()
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                    return authMultipartApi(originalRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            authMultipartApi.interceptors.request.eject(requestIntercept)
            authMultipartApi.interceptors.response.eject(responseIntercept)
        }
    }, [state, refresh])

    return authMultipartApi
}

export default useAuthMultipartApi