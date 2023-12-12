import React, {useState} from 'react'
import './forums.css'
import {deleteFn, updateFn} from '../../api/authApi'
import {useStateContext} from '../../context/context'

export default function ForumComment(prop) {
    const {comment} = prop
    const authorArray = comment.author.split('|')
    const {state} = useStateContext()
    const popup = document.getElementById('popupForumComment' + comment.id)
    const role = state.role
    const [updateComment, setUpdateComment] = useState({
        date: '', author: authorArray[0], id: comment.idEntity, text: ''
    })
    const date = new Date(comment.date).toLocaleDateString('uk-UA') + ' ' + new Date(comment.date).toLocaleTimeString('uk-UA').slice(0, 5)

    async function deleteComment() {
        await deleteFn('/forum-comments', comment.id)
        window.location.reload()
    }

    function handleText(e) {
        setUpdateComment({...updateComment, text: e.target.value})
    }

    async function editComment() {
        updateComment.date = new Date().toJSON().slice(0, 16)
        await updateFn('/forum-comments', comment.id, updateComment)
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
            <button className="admin-btn edit-btn" onClick={() => popup.showModal()}>
                Edit
            </button>
            <button className="admin-btn delete-btn" onClick={deleteComment}>
                Delete
            </button>
        </div>) : null}
        <dialog className="popup" id={"popupForumComment" + comment.id}>
            <div
                className="closeBtn"
                onClick={() => popup.close()}
            >
            </div>
            <h4>Edit comment</h4>
            <p>Input new text:</p>
            <textarea
                onChange={handleText}
                value={updateComment.text}
            ></textarea>
            <button
                className="admin-btn edit-btn"
                type="submit"
                onClick={editComment}
            >
                Edit
            </button>
        </dialog>
    </main>
}
