import React, {useState} from 'react'
import './News.css'
import {useAuthentication} from "../../context/context";
import {deleteFn, updateFn} from "../../api/authApi";

export default function NewsComment(prop) {
    const {comment} = prop
    const authorArray = comment.author.split('|')
    const {state} = useAuthentication()
    const popup = document.getElementById('popupNewsComment' + comment.id)
    const role = state.role
    const [updateComment, setUpdateComment] = useState({
        date: '', author: authorArray[0], id: comment.idEntity, text: ''
    })
    const date = new Date(comment.date).toLocaleDateString('uk-UA') + ' ' + new Date(comment.date).toLocaleTimeString('uk-UA').slice(0, 5)

    async function deleteComment() {
        await deleteFn('/news-comments', comment.id)
        window.location.reload()
    }

    function updateNewsText(e) {
        setUpdateComment({...updateComment, text: e.target.value})
    }

    async function editComment() {
        updateComment.date = new Date().toJSON().slice(0, 16)
        await updateFn('/news-comments', comment.id, updateComment)
        window.location.reload()
    }

    return <main className="forum-page-container">
        <div className="comment-header-container">
            <p>{authorArray[1] + " " + authorArray[2]}</p>
            <h5>{date}</h5>
        </div>
        <p>{comment.text}</p>
        {role === "ADMIN" ? (<div
            style={{textAlign: 'center'}}
        >
            <button
                className="admin-btn edit-btn"
                onClick={() => popup.showModal()}
            >
                Редагувати
            </button>
            <button
                className="admin-btn delete-btn"
                onClick={deleteComment}
            >
                Видалити
            </button>
        </div>) : null}
        <dialog className="popup" id={"popupNewsComment" + comment.id}>
            <div className="closeBtn" onClick={() => popup.close()}></div>
            <h4>Редагування коментарію</h4>
            <p>Введіть текст</p>
            <textarea
                onChange={updateNewsText}
                value={updateComment.text}
            ></textarea>
            <button
                className="admin-btn edit-btn"
                type="submit"
                onClick={editComment}
            >
                Редагувати
            </button>
        </dialog>
    </main>
}
