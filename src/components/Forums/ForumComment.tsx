import React, {useState} from "react";
import PropTypes from "prop-types";
import {useDeleteForumCommentMutation, useEditForumCommentMutation,} from "../../store/auth/authApiSlice";
import {useSelector} from "react-redux";
import {selectCurrentRole} from "../../store/auth/authSlice";

export default function ForumComment(prop: PropTypes.InferProps<typeof ForumComment.propTypes>) {
    const {comment} = prop;
    const [deleteCommentCall] = useDeleteForumCommentMutation();
    const popup = document.getElementById(String("popupForumComment" + comment.id));
    const [updateCommentCall] = useEditForumCommentMutation();
    const role = useSelector(selectCurrentRole);
    const [updateComment, setUpdateComment] = useState({
        createdDate: "", emailUser: "", idForum: 0, text: ""
    });
    const minutes = String(comment.createdDate[4]).length === 1
        ? "0" + String(comment.createdDate[4])
        : String(comment.createdDate[4]);
    const hours = String(comment.createdDate[3]).length === 1
        ? "0" + String(comment.createdDate[3])
        : String(comment.createdDate[3]);
    const months = String(comment.createdDate[1]).length === 1
        ? "0" + String(comment.createdDate[1])
        : String(comment.createdDate[1]);
    const days = String(comment.createdDate[2]).length === 1
        ? "0" + String(comment.createdDate[2])
        : String(comment.createdDate[2]);
    const createdDate = days + "." + months + "." + String(comment.createdDate[0]) + " " +
        hours + ":" + minutes;

    const deleteComment = () => {
        deleteCommentCall(comment.id);
        window.location.reload();
    };

    const openPopup = () => {
        popup.classList.add("open-popupForums");
    };

    const closePopup = () => {
        popup.classList.remove("open-popupForums");
    }

    const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdateComment({...updateComment, text: event.target.value});
    };

    const editComment = () => {
        updateComment.createdDate =
            new Date().toLocaleDateString("uk-UA") +
            " " +
            new Date().toLocaleTimeString("uk-UA").slice(0, 5);
        updateComment.emailUser = comment.createdBy.email;
        updateComment.idForum = comment.forum.idForum;
        updateCommentCall({commentId: comment.id, updateComment});
        window.location.reload();
    };

    return (
        <>
            <main id="forumCommentJSPage">
                <div id="forumCommentJSContainer">
                    <p id="forumCommentJSPar1">#{comment.id}</p>
                    <p id="forumCommentJSPar2">
                        {comment.createdBy.firstName + " " + comment.createdBy.lastName}
                    </p>
                </div>
                <div id="forumCommentJSContainer1">
                    <p id="forumCommentJSText">{comment.text}</p>
                </div>
                {role === "ADMIN" ? (
                    <div
                        style={{
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "space-between",
                            display: "flex",
                            fontSize: "0.9em",
                        }}
                    >
                        <p id="forumCommentJSTextDate">{createdDate}</p>
                        <button className="forumsSpecialButton forumsEditButton" onClick={openPopup}>
                            Edit
                        </button>
                        <button className="forumsSpecialButton forumsDeleteButton" onClick={deleteComment}>
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
                            fontSize: "0.9em",
                        }}
                    >
                        <p id="forumCommentJSTextDate">{createdDate}</p>
                    </div>
                )}
                <div
                    style={{
                        paddingTop: "1em",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div className="popupForums" id={"popupForumComment" + comment.id}>
                        <button
                            id="closeNewForum"
                            onClick={closePopup}
                        >
                            close
                        </button>
                        <h1>Edit comment</h1>
                        <div>
                            <p>Input new text:</p>
                            <textarea
                                onChange={handleText}
                                value={updateComment.text}
                            ></textarea>
                        </div>
                        <button
                            className="ForumsJSCreateNewForumButton"
                            type="submit"
                            onClick={editComment}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

ForumComment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        createdDate: PropTypes.array.isRequired,
        createdBy: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        }),
        forum: PropTypes.shape({
            idForum: PropTypes.number.isRequired
        }),
        text: PropTypes.string.isRequired
    }).isRequired,
};
