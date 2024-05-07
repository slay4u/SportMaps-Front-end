import React, {useState} from 'react'
import ForumComment from './ForumComment'
import {useParams} from 'react-router-dom'
import './forums.css'
import useAuthentication from '../../hooks/useAuthentication'
import {createFn, deleteFn, getByIdFn, updateFn} from '../../api/authApi'
import {CircularProgress} from '@mui/material'

export default function ForumPage() {
    const {id} = useParams()
    const {state} = useAuthentication()
    const [updateForum, setUpdateForum] = useState({
        name: '', date: '', text: '', author: ''
    })
    const [comment, setComment] = useState({
        text: '', id: id, author: jwtDecode(state?.token)?.sub, date: ''
    })

    const {data, isLoading} = useQuery({
        queryKey: ['forums', id], queryFn: () => getByIdFn('/forums', id)
    })
    const queryClient = useQueryClient()
    const editForum = useMutation({
        mutationFn: (body) => updateFn('/forums', id, body),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['forums', id]})
    })
    const deleteForum = useMutation({
        mutationFn: () => deleteFn('/forums', id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['forums']})
    })
    const createComment = useMutation({
        mutationFn: (body) => createFn('/forum-comments', body),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['forum-comments']})
    })

    const forumDate =
        new Date(data?.date).toLocaleDateString('uk-UA') + ' ' +
        new Date(data?.date).toLocaleTimeString('uk-UA').slice(0, 5)

    function updateComment(e) {
        setComment({...comment, text: e.target.value})
    }

    function handleChange(e) {
        setUpdateForum(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function updateForumFn() {
        updateForum.date = new Date().toJSON().slice(0, 16)
        updateForum.author = data.author.split('|')[0]
        editForum.mutate(updateForum)
        window.location.reload()
    }

    async function submitComment() {
        comment.date = new Date().toJSON().slice(0, 16)
        createComment.mutate(comment)
        window.location.reload()
    }

    function deleteForumFn() {
        deleteForum.mutate()
        window.location.href = '/forums'
    }

    return <main>
        {isLoading ? <CircularProgress/> : <>
            <div className='forum-page-container'>
                <div className='forum-page-container1'>
                    <h3>{data?.name}</h3>
                    <p>{data?.author?.split('|')[1] + ' ' + data?.author?.split('|')[2]}</p>
                </div>
                <div className='forum-page-container2'>
                    <p>{data?.text}</p>
                </div>
                {jwtDecode(state?.token)?.role === 'ADMIN' ? (<div style={{
                    textAlign: 'center', alignItems: 'center', justifyContent: 'space-between', display: 'flex',
                }}>
                    <p>{forumDate}</p>
                    <button className='admin-btn edit-btn' onClick={
                        () => document.getElementById('popupForumPage' + id).showModal()}>
                        Edit
                    </button>
                    <button onClick={deleteForumFn} className='admin-btn delete-btn'>
                        Delete
                    </button>
                    <dialog className='popup' id={'popupForumPage' + id}>
                        <div className='closeBtn'
                             onClick={() => document.getElementById('popupForumPage' + id).close()}>
                        </div>
                        <h4>Edit forum</h4>
                        <p>Input new name:</p>
                        <input onChange={handleChange} name='name'></input>
                        <p>Input new text:</p>
                        <textarea onChange={handleChange} name='text'></textarea>
                        <button className='admin-btn edit-btn' type='submit' onClick={updateForumFn}>
                            Edit
                        </button>
                    </dialog>
                </div>) : (<p>{forumDate}</p>)}
            </div>
            <div className='forum-page-container3'>
                <textarea className='comment-area' onChange={updateComment}></textarea>
                <button className='send-btn' onClick={submitComment} type='submit'>
                    Post comment
                </button>
            </div>
            <div className='template-grid'>
                {data?.comments?.map(comment => <ForumComment key={comment.id} comment={comment}/>)}
            </div>
        </>}
    </main>
}
