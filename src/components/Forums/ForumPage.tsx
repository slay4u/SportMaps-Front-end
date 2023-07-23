import React, {useEffect, useState} from "react";
import {
    useCreateForumCommentMutation,
    useDeleteForumCommentMutation,
    useDeleteForumMutation,
    useEditForumMutation,
    useGetForumByIdMutation,
    useGetUserByEmailMutation,
} from "../../store/auth/authApiSlice";
import ForumComment from "./ForumComment";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentEmail, selectCurrentRole} from "../../store/auth/authSlice";
import "./forums.css";

export default function ForumPage() {
    const [forumCall] = useGetForumByIdMutation();
    const [userCall] = useGetUserByEmailMutation();
    const [deleteCall] = useDeleteForumMutation();
    const [deleteCommentsCall] = useDeleteForumCommentMutation();
    const [editCall] = useEditForumMutation();
    const forumId = parseInt(window.location.href.slice(32));
    const email = useSelector(selectCurrentEmail);
    const role = useSelector(selectCurrentRole);
    const [authorName, setAuthorName] = useState("");
    const [commentCall] = useCreateForumCommentMutation();
    const popup = document.querySelector("dialog");
    const navigate = useNavigate();
    const [forum, setForum] = useState({
        name: "", createDate: "", desc: "", emailUser: "", commentList: []
    });
    const [updateForum, setUpdateForum] = useState({
        name: "", createDate: "", desc: "", emailUser: ""
    });
    const forumDate =
        new Date(forum.createDate).toLocaleDateString("uk-UA") + " " +
        new Date(forum.createDate).toLocaleTimeString("uk-UA").slice(0, 5);
    const [comment, setComment] = useState({
        text: "", idForum: forumId, emailUser: email, createdDate: ""
    });

    useEffect(() => {
        forumCall(forumId).then((res: { data: typeof forum }) => {
            setForum(res.data);
            userCall(res.data.emailUser).then((response: { data: { firstName: "", lastName: "" } }) => {
                setAuthorName(response.data.firstName + " " + response.data.lastName);
            });
        });
    }, []);

    const deleteForum = () => {
        if (forum.commentList !== null) {
            forum.commentList.map((comment) => deleteCommentsCall(comment.id));
        }
        deleteCall(forumId);
        setTimeout(() => {
            navigate("/forums");
        }, 1000);
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

    function getCurrentDate() {
        return (
            new Date().toLocaleDateString("uk-UA") + " " +
            new Date().toLocaleTimeString("uk-UA").slice(0, 5)
        );
    }

    function updateComment(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setComment({...comment, text: event.target.value});
    }

    function submitComment() {
        comment.createdDate = getCurrentDate();
        commentCall(comment);
        window.location.reload();
    }

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setUpdateForum(prev=> ({...prev, [e.target.name]: e.target.value}));
    };

    const editForum = () => {
        updateForum.createDate = getCurrentDate();
        updateForum.emailUser = forum.emailUser;
        editCall({forumId, updateForum});
        window.location.reload();
    };

    return (
        <>
            <main>
                <div className="forum-page-container">
                    <div className="forum-page-container1">
                        <h3>{forum.name}</h3>
                        <p>{authorName}</p>
                    </div>
                    <div className="forum-page-container2">
                        <p>{forum.desc}</p>
                    </div>
                    {role === "ADMIN" ? (
                        <div
                            style={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "space-between",
                                display: "flex",
                            }}
                        >
                            <p>{forumDate}</p>
                            <button className="admin-btn edit-btn" onClick={() => popup.showModal()}>
                                Edit
                            </button>
                            <button onClick={deleteForum} className="admin-btn delete-btn">
                                Delete
                            </button>
                        </div>
                    ) : (<p>{forumDate}</p>)}
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
                    {forum.commentList && forum.commentList.map((comment) => (
                            <ForumComment key={comment.id} comment={comment}/>))}
                </div>
                <dialog className="popup" onClick={close}>
                    <div
                        className="closeBtn"
                        onClick={() => popup.close()}
                    >
                    </div>
                    <h4>Edit forum</h4>
                    <p>Input new name:</p>
                    <input onChange={handleChange} name="name"></input>
                    <p>Input new text:</p>
                    <textarea onChange={handleChange} name="desc"></textarea>
                    <button
                        className="admin-btn edit-btn"
                        type="submit"
                        onClick={editForum}
                    >
                        Edit
                    </button>
                </dialog>
            </main>
        </>
    );
}
