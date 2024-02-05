import useAuthApi from '../hooks/useAuthApi'

export async function getAllFn(url, page) {
    const authApi = useAuthApi()
    const {data} = await authApi.get(url, {
        params: {
            page: page
        }
    })
    return data
}

export async function getByIdFn(url, id) {
    const authApi = useAuthApi()
    const {data} = await authApi.get(url + `/${id}`)
    return data
}

export async function createFn(url, body) {
    const authApi = useAuthApi()
    await authApi.post(url, body)
}

export async function updateFn(url, id, body) {
    const authApi = useAuthApi()
    await authApi.put(url + `/${id}`, body)
}

export async function deleteFn(url, id) {
    const authApi = useAuthApi()
    await authApi.delete(url + `/${id}`)
}