import {api} from './axiosInstances'

export async function logoutFn() {
    await api.delete('')
}

export async function loginFn(body) {
    const {data} = await api.post('/login', body)
    return data
}

export async function signupFn(body) {
    await api.post('/signup', body)
}

export async function verifyFn(token) {
    await api.get(`/${token}`)
}