import React, {useState} from 'react'
import FeaturedTopic from './FeaturedTopic'
import './forums.css'
import {createFn, getAllFn} from '../../api/authApi'
import {useAuthentication} from '../../context/context'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {CircularProgress} from '@mui/material'
import {jwtDecode} from 'jwt-decode'

export default function Forums() {
    const {state} = useAuthentication()
    const [newForum, setNewForum] = useState({
        name: '', date: '', text: '', author: jwtDecode(state?.token)?.sub
    })
    const queryClient = useQueryClient()
    const {data, isLoading} = useQuery({
        queryKey: ['forums'], queryFn: () => getAllFn('/forums', 0)
    })
    const createForum = useMutation({
        mutationFn: (body) => createFn('/forums', body),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['forums']})
    })

    function handleChange(e) {
        setNewForum(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSubmit() {
        newForum.date = new Date().toJSON().slice(0, 16)
        createForum.mutate(newForum)
        window.location.reload()
    }

    return <main>
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
        {isLoading ? <CircularProgress/> : <div className='template-grid'>
            {data?.content?.map(topic => <FeaturedTopic key={topic.id} topic={topic}/>).reverse()}
        </div>}
    </main>
}
