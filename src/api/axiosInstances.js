import axios from 'axios'

const baseURL = 'http://localhost:8090/sm'

export const authApi = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
})

export const api = axios.create({
    baseURL: baseURL + '/auth',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    withCredentials: true
})

export const authMultipartApi = axios.create({
    baseURL: baseURL
})