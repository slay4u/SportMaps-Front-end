import React, {useEffect, useState} from 'react'
import FeaturedTopic from './FeaturedTopic'
import './forums.css'
import {createFn, getAllFn} from '../../api/authApi'
import {useStateContext} from '../../context/context'

export default function Forums() {
    const [forums, setForums] = useState([])
    const popup = document.getElementById('popupForums')
    const {state} = useStateContext()
    const email = state.email
    const [newForum, setNewForum] = useState({
        name: '', date: '', text: '', author: email
    })

    useEffect(() => {
        (async function() {
            const data = await getAllFn('/forums', 0)
            setForums(data.content)
        })()
    }, [])

    function handleChange(e) {
        setNewForum(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleSubmit() {
        newForum.date = new Date().toJSON().slice(0, 16)
        await createFn('/forums', newForum)
        window.location.reload()
    }

    return <main>
            <div className="create-btn-container">
                <button
                    className="admin-btn create-btn"
                    onClick={() => popup.showModal()}
                >
                    Create new forum
                </button>
            </div>
            <div className="template-grid">
                {forums && forums
                    .map((topic) => <FeaturedTopic key={topic.id} topic={topic}/>)
                    .reverse()}
            </div>
            <dialog className="popup" id={"popupForums"}>
                <div
                    className="closeBtn"
                    onClick={() => popup.close()}
                ></div>
                <h4>New forum</h4>
                <div>
                    <p>Input new name:</p>
                    <input onChange={handleChange} name="name"></input>
                    <p>Input new text:</p>
                    <textarea onChange={handleChange} name="text"></textarea>
                </div>
                <button
                    className="admin-btn create-btn"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Create
                </button>
            </dialog>
        </main>
}
