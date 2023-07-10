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
    const popup = document.getElementById("popup") as HTMLDialogElement;
    const navigate = useNavigate();
    const [forum, setForum] = useState({
        name: "", createDate: "", desc: "", emailUser: "", commentList: []
    });
    const [updateForum, setUpdateForum] = useState({
        name: "", createDate: "", desc: "", emailUser: ""
    });
    const forumDate =
        new Date(forum.createDate).toLocaleDateString("uk-UA") +
        " " +
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

    const openPopup = () => {
        popup.showModal();
    };

    const closePopup = () => {
        popup.close();
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
            new Date().toLocaleDateString("uk-UA") +
            " " +
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

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateForum({...updateForum, name: event.target.value});
    };

    const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdateForum({...updateForum, desc: event.target.value});
    };

    const editForum = () => {
        updateForum.createDate = getCurrentDate();
        updateForum.emailUser = forum.emailUser;
        editCall({forumId, updateForum});
        window.location.reload();
    };

    return (
        <>
            <main id="forumPageJSPage">
                <div id="forumPageJSTopicContainer">
                    <div id="forumPageJSTopicContainer1">
                        <h1 id="forumPageJSTopicHeader">{forum.name}</h1>
                        <p id="forumPageJSUserNick">{authorName}</p>
                    </div>
                    <div id="forumPageJSTopicContainer2">
                        <p id="forumPageJSTopicParagraph">{forum.desc}</p>
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
                            <p id="forumPageJSTopicDate">{forumDate}</p>
                            <button className="forumsSpecialButton forumsEditButton" onClick={openPopup}>
                                Edit
                            </button>
                            <button onClick={deleteForum} className="forumsSpecialButton forumsDeleteButton">
                                Delete
                            </button>
                        </div>
                    ) : (
                        <div
                            style={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "space-between",
                                display: "flex",
                            }}
                        >
                            <p id="forumPageJSTopicDate">{forumDate}</p>
                        </div>
                    )}
                </div>
                <div id="forumPageJSTopicContainer3">
          <textarea
              id="forumCommentArea"
              onChange={updateComment}
          ></textarea>
                    <button
                        id="forumPageJSTopicSubmitButton"
                        onClick={submitComment}
                        type="submit"
                    >
                        Post comment
                    </button>
                </div>
                <div>
                    {forum.commentList &&
                        forum.commentList.map((comment) => (
                            <ForumComment key={comment.id} comment={comment}/>
                        ))}
                </div>
                <div
                    style={{
                        paddingTop: "1em",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <dialog className="popupForums" id="popup" onClick={close}>
                        <button
                            id="closeNewForum"
                            onClick={closePopup}
                        >
                            close
                        </button>
                        <h1>Edit forum</h1>
                        <div>
                            <p>Input new name:</p>
                            <input onChange={handleName} value={updateForum.name}></input>
                            <p>Input new text:</p>
                            <textarea
                                onChange={handleText}
                                value={updateForum.desc}
                            ></textarea>
                        </div>
                        <button
                            className="ForumsJSCreateNewForumButton"
                            type="submit"
                            onClick={editForum}
                        >
                            Edit
                        </button>
                    </dialog>
                </div>
            </main>
        </>
    );
}
