import axios from 'axios'

const baseURL = 'http://localhost:8090/api/v1'
const refreshTokenRequest = {
    email: localStorage.getItem('email'),
    refreshToken: localStorage.getItem('refreshToken')
}

const authApi = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    withCredentials: false
})

const api = axios.create({
    baseURL: baseURL + '/auth',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    withCredentials: false
})

export async function refreshTokenFn(refreshTokenRequest) {
    const {data} = await api.post('/refresh', refreshTokenRequest)
    return data
}

authApi.interceptors.response.use(response => {
    return response
}, async error => {
    const originalRequest = error.config
    if (error.response.status === 406 && !originalRequest._retry) {
        originalRequest._retry = true
        const data = await refreshTokenFn(refreshTokenRequest)
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        return authApi(originalRequest)
    }
    if (error.response.status === 403) window.location.href = '/login'
    return Promise.reject(error)
})

export async function logoutFn(token) {
    await api.delete(`/${token}`)
}

export async function loginFn(url, body) {
    const {data} = await api.post(url, body)
    return data
}

export async function signupFn(url, body) {
    await api.post(url, body)
}

export async function verifyFn(token) {
    await api.get(`/${token}`)
}

export async function getAllFn(url, page) {
    const {data} = await authApi.get(url, {
        params: {
            page: page
        }
    })
    return data
}

export async function getByIdFn(url, id) {
    const {data} = await authApi.get(url + `/${id}`)
    return data
}

export async function createFn(url, body) {
    await authApi.post(url, body)
}

export async function updateFn(url, id, body) {
    await authApi.put(url + `/${id}`, body)
}

export async function deleteFn(url, id) {
    await authApi.delete(url + `/${id}`)
}