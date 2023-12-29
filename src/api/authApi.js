import axios from 'axios'

const baseURL = 'http://localhost:8090/api/v1'
const refreshRequest = {
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

async function refreshTokenFn(body) {
    let response
    try {
        response = await api.post('/refresh', body)
    } catch (err) {
        localStorage.clear()
        window.location.href = '/login'
    }
    return response.data
}

authApi.interceptors.response.use(response => response,
    async err => {
    const originalRequest = err.config
    if (err.response.status === 406 && !originalRequest._retry) {
        originalRequest._retry = true
        const data = await refreshTokenFn(refreshRequest)
        localStorage.setItem('token', data.token)
        return authApi(originalRequest)
    }
    return Promise.reject(err)
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