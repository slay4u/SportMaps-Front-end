import React, {useEffect, useState} from 'react'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'
import {useParams} from 'react-router-dom'
import NewsComment from './NewsComment'
import './News.css'
import {useStateContext} from '../../context/context'
import {createFn, deleteFn, getByIdFn, updateFn} from '../../api/authApi'

export default function NewsPage() {
    const {id} = useParams()
    const {state} = useStateContext()
    const email = state.email
    const role = state.role
    const [news, setNews] = useState({})
    const [comment, setComment] = useState({
        text: '', id: id, author: email, date: ''
    })
    const [updateNews, setUpdateNews] = useState({
        name: '', date: '', text: '', author: ''
    })
    const popup = document.getElementById('popupNewsPage' + id)
    const newsDate = new Date(news.date).toLocaleDateString('uk-UA') + ' ' + new Date(news.date).toLocaleTimeString('uk-UA').slice(0, 5)

    useEffect(() => {
        (async function() {
            const data = await getByIdFn('/news', id)
            setNews(data)
        })()
    }, [])

    function updateComment(e) {
        setComment({...comment, text: e.target.value})
    }

    function handleChange(e) {
        setUpdateNews(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function editNews() {
        updateNews.date = new Date().toJSON().slice(0, 16)
        updateNews.author = news.author.split('|')[0]
        await updateFn('/news', id, updateNews)
        window.location.reload()
    }

    async function submitComment() {
        comment.date = new Date().toJSON().slice(0, 16)
        await createFn('/news-comments', comment)
        window.location.reload()
    }

    async function deleteNews() {
        await deleteFn('/news', id)
        window.location.href = '/'
    }

    return <main>
        <img
            className="news-page-img"
            src="https://source.unsplash.com/random/?sport/"
            alt="sport-img"
        ></img>
        <div className="news-page-title-section">
            <h3>{news.name}</h3>
            <button id="news-page-save-btn">
                Save
                <TurnedInNotIcon sx={{fontSize: "2rem"}}/>
            </button>
            {role === "ADMIN" ? (<>
                <button
                    className="admin-btn edit-btn"
                    onClick={() => popup.showModal()}
                >
                    Редагувати
                </button>
                <button
                    className="admin-btn delete-btn"
                    onClick={deleteNews}
                >
                    Видалити
                </button>
                <dialog className="popup" id={'popupNewsPage' + id}>
                    <div className="closeBtn" onClick={() => popup.close()}></div>
                    <h4>Редагування новини</h4>
                    <div>
                        <p>Введіть назву</p>
                        <input
                            onChange={handleChange}
                            name="name"
                        ></input>
                    </div>
                    <div>
                        <p>Введіть текст</p>
                        <textarea
                            onChange={handleChange}
                            name="text"
                        ></textarea>
                    </div>
                    <button
                        className="admin-btn edit-btn"
                        type="submit"
                        onClick={editNews}
                    >
                        Редагувати
                    </button>
                </dialog>
            </>) : null}
        </div>
        <div className="news-page-author-section">
            <img
                id="news-page-author-avatar"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="author-avatar"
            ></img>
            <div className="news-page-author-info">
                <p>{news.author && news.author.split('|')[1] + " " + news.author.split('|')[2]}</p>
                <p>{newsDate}</p>
            </div>
        </div>
        <hr id="news-page-divider"/>
        <h4>{news.text}</h4>
        <hr id="news-page-divider"/>

        <h4>Коментарі</h4>
        <textarea
            className="comment-area"
            onChange={updateComment}
        ></textarea>
        <button
            className="send-btn"
            type="submit"
            onClick={submitComment}
        >
            Надіслати
        </button>
        <div className="template-grid">
            {news.comments && news.comments.map((comment) => (<NewsComment key={comment.id} comment={comment}/>))}
        </div>
    </main>
}
