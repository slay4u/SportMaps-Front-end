import useAuthApi from '../hooks/useAuthApi'
import {authApi, authMultipartApi} from './axiosInstances'

export async function getAllFn(url, page) {
    const api = useAuthApi(authApi)
    const {data} = await api.get(url, {
        params: {
            page: page
        }
    })
    return data
}

export async function getByIdFn(url, id) {
    const api = useAuthApi(authApi)
    const {data} = await api.get(url + `/${id}`)
    return data
}

export async function createFn(url, body) {
    const api = useAuthApi(authApi)
    await api.post(url, body)
}

export async function updateFn(url, id, body) {
    const api = useAuthApi(authApi)
    await api.put(url + `/${id}`, body)
}

export async function deleteFn(url, id) {
    const api = useAuthApi(authApi)
    await api.delete(url + `/${id}`)
}

export async function createMultipartFn(url, formData) {
    const api = useAuthApi(authMultipartApi)
    await api.post(url, formData)
}

export async function updateMultipartFn(url, id, formData) {
    const api = useAuthApi(authMultipartApi)
    await api.put(url + `/${id}`, formData)
}