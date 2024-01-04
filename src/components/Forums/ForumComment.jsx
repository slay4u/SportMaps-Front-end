import React, {useState} from 'react'
import './forums.css'
import {deleteFn, updateFn} from '../../api/authApi'
import {useAuthentication} from '../../context/context'
import {jwtDecode} from 'jwt-decode'
import {useMutation, useQueryClient} from '@tanstack/react-query'

export default function ForumComment(prop) {
    const {comment} = prop
    const {state} = useAuthentication()
    const [updateComment, setUpdateComment] = useState({
        date: '', author: comment?.author.split('|')[0], id: comment.idEntity, text: ''
    })
    const date =
        new Date(comment?.date).toLocaleDateString('uk-UA') + ' ' +
        new Date(comment?.date).toLocaleTimeString('uk-UA').slice(0, 5)

    const queryClient = useQueryClient()
    const editComment = useMutation({
        mutationFn: (body) => updateFn('/forum-comments', comment.id, body),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['forum-comments', comment.id]})
    })
    const deleteComment = useMutation({
        mutationFn: () => deleteFn('/forum-comments', comment.id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['forum-comments']})
    })

    function handleText(e) {
        setUpdateComment({...updateComment, text: e.target.value})
    }

    function editCommentFn() {
        updateComment.date = new Date().toJSON().slice(0, 16)
        editComment.mutate(updateComment)
        window.location.reload()
    }

    function deleteCommentFn() {
        deleteComment.mutate()
        window.location.reload()
    }

    return <main className='forum-page-container'>
        <div className='comment-header-container'>
            <p>{comment?.author.split('|')[1] + " " + comment?.author.split('|')[2]}</p>
            <h5>{date}</h5>
        </div>
        <p>{comment?.text}</p>
        {jwtDecode(state?.token)?.role === 'ADMIN' ? (<div
            style={{textAlign: 'center'}}
        >
            <button className='admin-btn edit-btn' onClick={() => document.getElementById('popupForumComment' + comment.id).showModal()}>
                Edit
            </button>
            <button className='admin-btn delete-btn' onClick={deleteCommentFn}>
                Delete
            </button>
        </div>) : null}
        <dialog className='popup' id={'popupForumComment' + comment.id}>
            <div
                className='closeBtn'
                onClick={() => document.getElementById('popupForumComment' + comment.id).close()}
            >
            </div>
            <h4>Edit comment</h4>
            <p>Input new text:</p>
            <textarea
                onChange={handleText}
            ></textarea>
            <button
                className='admin-btn edit-btn'
                type='submit'
                onClick={editCommentFn}
            >
                Edit
            </button>
        </dialog>
    </main>
}
