import React, {useState} from 'react'
import FeaturedTopic from './FeaturedTopic'
import './forums.css'
import {createFn, getAllFn} from '../../api/authApi'
import useAuthentication from '../../hooks/useAuthentication'
import {CircularProgress} from '@mui/material'
import useAuthApi from '../../hooks/useAuthApi'

export default function Forums() {
    const authApi = useAuthApi()
    const {state} = useAuthentication()
    const [newForum, setNewForum] = useState({
        name: '', date: '', text: '', author: state.email || ''
    })
    // const {data, isLoading} = useQuery({
    //     queryKey: ['forums'], queryFn: () => getAllFn('/forums', 0)
    // })
    // const createForum = useMutation({
    //     mutationFn: (body) => createFn('/forums', body),
    //     onSuccess: () => queryClient.invalidateQueries({queryKey: ['forums']})
    // })
    const {data, isLoading} = useQuery({
        queryKey: ['forums'], queryFn: async () => {
            const forums = await authApi.get('/forums', {
                params: {
                    page: 0
                }
            })
            return forums?.data
        }
    })
    const createForum = useMutation({
        mutationFn: (body) => {
            authApi.post('/forums', body)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['forums']})
    })

    function handleChange(e) {
        setNewForum(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSubmit() {
        createForum.mutate(newForum)
        // window.location.reload()
    }

    return <main>
        {state.token ? <>
            <dialog className='popup' id='popupForums'>
                <div className='closeBtn' onClick={
                    () => document.getElementById('popupForums').close()}></div>
                <h4>New forum</h4>
                <div>
                    <p>Input new name:</p>
                    <input onChange={handleChange} name='name'></input>
                    <p>Input new text:</p>
                    <textarea onChange={handleChange} name='text'></textarea>
                </div>
                <button className='admin-btn create-btn' type='submit' onClick={handleSubmit}>
                    Create
                </button>
            </dialog>
            <div className='create-btn-container'>
                <button className='admin-btn create-btn'
                        onClick={() => document.getElementById('popupForums').showModal()}>
                    Create new forum
                </button>
            </div>
        </> : null}
        {isLoading ? <CircularProgress/> : <div className='template-grid'>
            {data?.content?.map(topic => <FeaturedTopic key={topic.id} topic={topic}/>).reverse()}
        </div>}
    </main>
}
