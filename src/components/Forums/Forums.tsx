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
    const popup = document.getElementById("popup") as HTMLDialogElement;
    const email = useSelector(selectCurrentEmail);
    const [newForum, setNewForum] = useState({
        name: "", createDate: "", desc: "", emailUser: email
    });

    useEffect(() => {
        getAllForums({}).then((res: { data: typeof forums }) => {
            setForums(res.data);
        });
    }, []);

    const openPopup = () => {
        popup.showModal();
    };

    const close = () => {
        popup.addEventListener("click", e => {
          const dialogDimensions = popup.getBoundingClientRect();
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            popup.close();
          }
        })
    }

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewForum({...newForum, name: event.target.value});
    };

    const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewForum({...newForum, desc: event.target.value});
    };

    const sendValue = () => {
        newForum.createDate = new Date().toLocaleDateString("uk-UA") + " " + new Date().toLocaleTimeString("uk-UA").slice(0, 5);
        createNewForum(newForum);
        window.location.reload();
    };

    return (<>
        <main id="mainForumsPage">
            <div
                style={{alignItems: "center", textAlign: "center", margin: "1em"}}
            >
                <button
                    className="forumsSpecialButton forumsCreateButton"
                    onClick={openPopup}
                >
                   Create new forum
                </button>
            </div>
            <div id="forumsGridContainer">
                {forums && forums
                    .map((topic) => <FeaturedTopic key={topic.name} topic={topic}/>)
                    .reverse()}
            </div>
            <div
                style={{
                    paddingTop: "1em", display: "flex", justifyContent: "center",
                }}
            >
                <dialog className="popupForums" id="popup" onClick={close}>
                    <button
                        id="closeNewForum"
                        onClick={() => {
                            popup.close();
                        }}
                    >
                        close
                    </button>
                    <h1>New forum</h1>
                    <div>
                        <p>Input new name:</p>
                        <input onChange={handleName} value={newForum.name}></input>
                        <p>Input new text:</p>
                        <textarea onChange={handleText} value={newForum.desc}></textarea>
                    </div>
                    <button
                        className="ForumsJSCreateNewForumButton"
                        type="submit"
                        onClick={sendValue}
                    >
                        Create
                    </button>
                </dialog>
            </div>
        </main>
    </>);
}
