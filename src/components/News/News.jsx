import './News.css'
import React, {useEffect, useState} from 'react'
import MainFeaturedPost from './MainFeaturedPost'
import FeaturedPost from './FeaturedPost'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {useStateContext} from '../../context/context'
import {createFn, getAllFn} from '../../api/authApi'

export default function News() {
    const {state} = useStateContext()
    const email = state.email
    const role = state.role
    const [news, setNews] = useState([])
    const newsReverse = news ? [...news].reverse() : []
    const [newNews, setNewNews] = useState({
        name: '', date: '', text: '', author: email
    })
    const popup = document.getElementById('popupNews')

    const routeChange = () => {
        window.location.href = '/'
    }

    useEffect(() => {
        (async function() {
            const data = await getAllFn('/news', 0)
            setNews(data.content)
        })()
    }, [])

    function handleChange(e) {
        setNewNews(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleSubmit() {
        newNews.date = new Date().toJSON().slice(0, 16)
        await createFn('/news', newNews)
        window.location.reload()
    }

    return <main>
        <div className="news-img-container">
            <div className="news-img-item" onClick={routeChange}>
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
            <div className="news-img-item" onClick={routeChange}>
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
            <div className="news-img-item" onClick={routeChange}>
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
        {role === "ADMIN" ? (<div className="create-btn-container">
            <button
                className="admin-btn create-btn"
                onClick={() => popup.showModal()}
            >
                Створити новину
            </button>
        </div>) : null}
        <div>
            {newsReverse.slice(0, 1).map((post) => (<MainFeaturedPost key={post.id} post={post}/>))}
            <div className="template-grid">
                {newsReverse.slice(1).map((post) => (<FeaturedPost key={post.id} post={post}/>))}
            </div>
        </div>
        <dialog className="popup" id={'popupNews'}>
            <div className="closeBtn" onClick={() => popup.close()}></div>
            <h4>Створення новини</h4>
            <div>
                <p>Введіть назву</p>
                <input onChange={handleChange} name="name"></input>
                <p>Введіть текст</p>
                <textarea onChange={handleChange} name="text"></textarea>
            </div>
            <button
                className="admin-btn create-btn"
                type="submit"
                onClick={handleSubmit}
            >
                Створити
            </button>
        </dialog>
    </main>
}
