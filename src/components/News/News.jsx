import './News.css'
import React, {useState} from 'react'
import MainFeaturedPost from './MainFeaturedPost'
import FeaturedPost from './FeaturedPost'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {useAuthentication} from '../../context/context'
import {createFn, getAllFn} from '../../api/authApi'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {CircularProgress} from '@mui/material'

export default function News() {
    const {state} = useAuthentication()
    const [newNews, setNewNews] = useState({
        name: '', date: '', text: '', author: state.email
    })
    const queryClient = useQueryClient()
    const {data, isLoading} = useQuery({
        queryKey: ['news'], queryFn: () => getAllFn('/news', 0)
    })
    const createNews = useMutation({
        mutationFn: (body) => createFn('/news', body),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news']})
    })

    function handleChange(e) {
        setNewNews(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSubmit() {
        newNews.date = new Date().toJSON().slice(0, 16)
        createNews.mutate(newNews)
        window.location.reload()
    }

    return <main>
        <div className="news-img-container">
            <div className="news-img-item">
                <img
                    className="news-img"
                    src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80"
                    alt="first image"
                ></img>
                <span className="news-img-arrow">
                            <ArrowForwardIcon sx={{fontSize: '4rem'}}/>
                        </span>
                <p className="news-img-text">
                    The top 10 hiking trails in Maine
                </p>
            </div>
            <div className="news-img-item">
                <img
                    className="news-img"
                    src="https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
                    alt="first image"
                ></img>
                <span className="news-img-arrow">
                            <ArrowForwardIcon sx={{fontSize: '4rem'}}/>
                        </span>
                <p className="news-img-text">
                    The top 10 hiking trails in Maine
                </p>
            </div>
            <div className="news-img-item">
                <img
                    className="news-img"
                    src="https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="first image"
                ></img>
                <span className="news-img-arrow">
                            <ArrowForwardIcon sx={{fontSize: '4rem'}}/>
                        </span>
                <p className="news-img-text">
                    The top 10 hiking trails in Maine
                </p>
            </div>
        </div>
        {state.role === 'ADMIN' ? <div className='create-btn-container'>
            <button className='admin-btn create-btn'
                    onClick={() => document.getElementById('popupNews').showModal()}>
                Створити новину
            </button>
        </div> : null}
        {isLoading ? <CircularProgress/> : <>
            {data?.content?.slice(0, 1).map(post => (<MainFeaturedPost key={post.id} post={post}/>))}
            <div className='template-grid'>
                {data?.content?.slice(1).map(post => (<FeaturedPost key={post.id} post={post}/>)).reverse()}
            </div>
        </>}
        <dialog className='popup' id='popupNews'>
            <div className='closeBtn'
                 onClick={() => document.getElementById('popupNews').close()}></div>
            <h4>Створення новини</h4>
            <div>
                <p>Введіть назву</p>
                <input onChange={handleChange} name='name'></input>
                <p>Введіть текст</p>
                <textarea onChange={handleChange} name='text'></textarea>
            </div>
            <button className='admin-btn create-btn' type='submit' onClick={handleSubmit}>
                Створити
            </button>
        </dialog>
    </main>
}
