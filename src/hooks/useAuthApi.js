import useRefreshToken from './useRefreshToken'
import useAuthentication from './useAuthentication'
import {useEffect} from 'react'

const useAuthApi = (axiosInstance) => {
    const refresh = useRefreshToken()
    const {state} = useAuthentication()

    useEffect(() => {
        const requestIntercept = axiosInstance.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'])
                    config.headers['Authorization'] = `Bearer ${state?.token}`
                return config
            }, error => Promise.reject(error)
        )

        const responseIntercept = axiosInstance.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error?.config
                if (error?.response?.status === 406 && !originalRequest?.sent) {
                    originalRequest.sent = true
                    try {
                        const newToken = await refresh()
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                    } catch (err) {
                        return Promise.reject(err)
                    }
                    return axiosInstance(originalRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosInstance.interceptors.request.eject(requestIntercept)
            axiosInstance.interceptors.response.eject(responseIntercept)
        }
    }, [state, refresh])

    return axiosInstance
}

export default useAuthApi