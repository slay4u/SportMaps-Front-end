import React, {useEffect, useState} from "react";
import {useCreateNewForumMutation, useGetAllForumsMutation} from "../../store/auth/authApiSlice";
import FeaturedTopic from "./FeaturedTopic";
import "./forums.css";
import {useSelector} from "react-redux";
import {selectCurrentEmail} from "../../store/auth/authSlice";

export default function Forums() {
    const [getAllForums] = useGetAllForumsMutation();
    const [createNewForum] = useCreateNewForumMutation();
    const [forums, setForums] = useState([]);
    const popup = document.querySelector("dialog");
    const email = useSelector(selectCurrentEmail);
    const [newForum, setNewForum] = useState({
        name: "", createDate: "", desc: "", emailUser: email
    });

    useEffect(() => {
        getAllForums({}).then((res: { data: typeof forums }) => {
            setForums(res.data);
        });
    }, []);

    const close = () => {
        popup.addEventListener("click", e => {
            const dialogDimensions = popup.getBoundingClientRect();
            if (e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right || e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom) {
                popup.close();
            }
        })
    }

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setNewForum(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = () => {
        newForum.createDate = new Date().toLocaleDateString("uk-UA") + " " + new Date().toLocaleTimeString("uk-UA").slice(0, 5);
        createNewForum(newForum);
        window.location.reload();
    };

    return (<>
        <main>
            <div className="create-btn-container">
                <button
                    className="admin-btn create-btn"
                    onClick={() => popup.showModal()}
                >
                    Create new forum
                </button>
            </div>
            <div className="template-grid">
                {forums
                    .map((topic) => <FeaturedTopic key={topic.name} topic={topic}/>)
                    .reverse()}
            </div>
            <dialog className="popup" onClick={close}>
                <div
                    className="closeBtn"
                    onClick={() => popup.close()}
                ></div>
                <h4>New forum</h4>
                <div>
                    <p>Input new name:</p>
                    <input onChange={handleChange} name="name"></input>
                    <p>Input new text:</p>
                    <textarea onChange={handleChange} name="desc"></textarea>
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
    </>);
}
