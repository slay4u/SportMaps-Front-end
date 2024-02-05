import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import NewsComment from './NewsComment'
import './News.css'
import useAuthentication from '../../hooks/useAuthentication'
import {createFn, deleteFn, getByIdFn, updateFn} from '../../api/authApi'
import {jwtDecode} from 'jwt-decode'
import {useQueryClient, useQuery, useMutation} from '@tanstack/react-query'
import {CircularProgress} from '@mui/material'

export default function NewsPage() {
    const {id} = useParams()
    const {state} = useAuthentication()
    const [comment, setComment] = useState({
        text: '', id: id, author: jwtDecode(state?.token)?.sub, date: ''
    })
    const [updateNews, setUpdateNews] = useState({
        name: '', date: '', text: '', author: ''
    })

    const {data, isLoading} = useQuery({
        queryKey: ['news', id], queryFn: () => getByIdFn('/news', id)
    })
    const queryClient = useQueryClient()
    const editNews = useMutation({
        mutationFn: (body) => updateFn('/news', id, body),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news', id]})
    })
    const deleteNews = useMutation({
        mutationFn: () => deleteFn('/news', id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news']})
    })
    const createComment = useMutation({
        mutationFn: (body) => createFn('/news-comments', body),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news-comments']})
    })

    const newsDate =
        new Date(data?.date).toLocaleDateString('uk-UA') + ' ' +
        new Date(data?.date).toLocaleTimeString('uk-UA').slice(0, 5)

    function updateComment(e) {
        setComment({...comment, text: e.target.value})
    }

    function handleChange(e) {
        setUpdateNews(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function updateNewsFn() {
        updateNews.date = new Date().toJSON().slice(0, 16)
        updateNews.author = data?.author.split('|')[0]
        editNews.mutate(updateNews)
        window.location.reload()
    }

    function submitComment() {
        comment.date = new Date().toJSON().slice(0, 16)
        createComment.mutate(comment)
        window.location.reload()
    }

    function deleteNewsFn() {
        deleteNews.mutate()
        window.location.href = '/'
    }

    return <main>
        {isLoading ? <CircularProgress/> : <>
            <img
                className='news-page-img'
                src='https://source.unsplash.com/random/?sport/'
                alt='sport-img'
            ></img>
            <div className='news-page-title-section'>
                <h3>{data?.name}</h3>
                {jwtDecode(state?.token)?.role === 'ADMIN' ? (<>
                    <button className='admin-btn edit-btn'
                            onClick={() => document.getElementById('popupNewsPage' + id).showModal()}>
                        Редагувати
                    </button>
                    <button className='admin-btn delete-btn'
                            onClick={deleteNewsFn}>
                        Видалити
                    </button>
                    <dialog className='popup' id={'popupNewsPage' + id}>
                        <div className='closeBtn' onClick={() => document.getElementById('popupNewsPage' + id).close()}></div>
                        <h4>Редагування новини</h4>
                        <div>
                            <p>Введіть назву</p>
                            <input
                                onChange={handleChange}
                                name='name'
                            ></input>
                        </div>
                        <div>
                            <p>Введіть текст</p>
                            <textarea
                                onChange={handleChange}
                                name='text'
                            ></textarea>
                        </div>
                        <button className='admin-btn edit-btn'
                                type='submit'
                                onClick={updateNewsFn}>
                            Редагувати
                        </button>
                    </dialog>
                </>) : null}
            </div>
            <div className='news-page-author-section'>
                <img
                    id='news-page-author-avatar'
                    src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
                    alt='author-avatar'
                ></img>
                <div className='news-page-author-info'>
                    <p>{data?.author.split('|')[1] + " " + data?.author.split('|')[2]}</p>
                    <p>{newsDate}</p>
                </div>
            </div>
            <hr id='news-page-divider'/>
            <h4>{data?.text}</h4>
            <hr id='news-page-divider'/>

            <h4>Коментарі</h4>
            <textarea
                className='comment-area'
                onChange={updateComment}
            ></textarea>
            <button className='send-btn'
                    type='submit'
                    onClick={submitComment}>
                Надіслати
            </button>
            <div className='template-grid'>
                {data?.comments.map((comment) => (<NewsComment key={comment.id} comment={comment}/>))}
            </div>
        </>}
    </main>
}
