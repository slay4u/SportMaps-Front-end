import React, {useState} from 'react'
import './News.css'
import {useAuthentication} from '../../context/context'
import {deleteFn, updateFn} from '../../api/authApi'
import {jwtDecode} from 'jwt-decode'
import {useMutation, useQueryClient} from '@tanstack/react-query'

export default function NewsComment(prop) {
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
        mutationFn: (body) => updateFn('/news-comments', comment.id, body),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news-comments', comment.id]})
    })
    const deleteComment = useMutation({
        mutationFn: () => deleteFn('/news-comments', comment.id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news-comments']})
    })

    function updateCommentText(e) {
        setUpdateComment({...updateComment, text: e.target.value})
    }

    function updateCommentFn() {
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
        {jwtDecode(state?.token)?.role === 'ADMIN' ? (<div style={{textAlign: 'center'}}>
            <button className='admin-btn edit-btn'
                    onClick={() => document.getElementById('popupNewsComment' + comment?.id).showModal()}>
                Редагувати
            </button>
            <button className='admin-btn delete-btn'
                    onClick={deleteCommentFn}>
                Видалити
            </button>
        </div>) : null}
        <dialog className='popup' id={'popupNewsComment' + comment?.id}>
            <div className='closeBtn' onClick={() => document.getElementById('popupNewsComment' + comment?.id).close()}></div>
            <h4>Редагування коментарію</h4>
            <p>Введіть текст</p>
            <textarea
                onChange={updateCommentText}
            ></textarea>
            <button className='admin-btn edit-btn'
                    type='submit'
                    onClick={updateCommentFn}>
                Редагувати
            </button>
        </dialog>
    </main>
}
