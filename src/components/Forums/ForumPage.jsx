import React, {useEffect, useState} from 'react'
import ForumComment from './ForumComment'
import {useParams} from 'react-router-dom'
import './forums.css'
import {useStateContext} from '../../context/context'
import {createFn, deleteFn, getByIdFn, updateFn} from '../../api/authApi'

export default function ForumPage() {
    const {id} = useParams()
    const {state} = useStateContext()
    const email = state.email
    const role = state.role
    const popup = document.getElementById('popupForumPage' + id)
    const [forum, setForum] = useState({})
    const [updateForum, setUpdateForum] = useState({
        name: '', date: '', text: '', author: ''
    })
    const forumDate = new Date(forum.date).toLocaleDateString('uk-UA') + ' ' + new Date(forum.date).toLocaleTimeString('uk-UA').slice(0, 5)
    const [comment, setComment] = useState({
        text: '', id: id, author: email, date: ''
    })

    useEffect(() => {
        (async function() {
            const data = await getByIdFn('/forums', id)
            setForum(data)
        })()
    }, [])

    async function deleteForum() {
        await deleteFn('/forums', id)
        window.location.href = '/forums'
    }

    function updateComment(e) {
        setComment({...comment, text: e.target.value})
    }

    async function submitComment() {
        comment.date = new Date().toJSON().slice(0, 16)
        await createFn('/forum-comments', comment)
        window.location.reload()
    }

    function handleChange(e) {
        setUpdateForum(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function editForum() {
        updateForum.date = new Date().toJSON().slice(0, 16)
        updateForum.author = forum.author.split('|')[0]
        await updateFn('/forums', id, updateForum)
        window.location.reload()
    }

    return <main>
        <div className="forum-page-container">
            <div className="forum-page-container1">
                <h3>{forum.name}</h3>
                <p>{forum.author && forum.author.split('|')[1] + " " + forum.author.split('|')[2]}</p>
            </div>
            <div className="forum-page-container2">
                <p>{forum.text}</p>
            </div>
            {role === "ADMIN" ? (<div
                style={{
                    textAlign: "center", alignItems: "center", justifyContent: "space-between", display: "flex",
                }}
            >
                <p>{forumDate}</p>
                <button className="admin-btn edit-btn" onClick={() => popup.showModal()}>
                    Edit
                </button>
                <button onClick={deleteForum} className="admin-btn delete-btn">
                    Delete
                </button>
            </div>) : (<p>{forumDate}</p>)}
        </div>
        <div className="forum-page-container3">
                    <textarea
                        className="comment-area"
                        onChange={updateComment}
                    ></textarea>
            <button
                className="send-btn"
                onClick={submitComment}
                type="submit"
            >
                Post comment
            </button>
        </div>
        <div className="template-grid">
            {forum.comments && forum.comments.map((comment) => (<ForumComment key={comment.id} comment={comment}/>))}
        </div>
        <dialog className="popup" id={"popupForumPage" + id}>
            <div
                className="closeBtn"
                onClick={() => popup.close()}
            >
            </div>
            <h4>Edit forum</h4>
            <p>Input new name:</p>
            <input onChange={handleChange} name="name"></input>
            <p>Input new text:</p>
            <textarea onChange={handleChange} name="text"></textarea>
            <button
                className="admin-btn edit-btn"
                type="submit"
                onClick={editForum}
            >
                Edit
            </button>
        </dialog>
    </main>
}
