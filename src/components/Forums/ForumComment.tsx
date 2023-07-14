import React, {useState} from "react";
import PropTypes from "prop-types";
import {useDeleteForumCommentMutation, useEditForumCommentMutation,} from "../../store/auth/authApiSlice";
import {useSelector} from "react-redux";
import {selectCurrentRole} from "../../store/auth/authSlice";
import "./forums.css";

export default function ForumComment(prop: PropTypes.InferProps<typeof ForumComment.propTypes>) {
    const {comment} = prop;
    const [deleteCommentCall] = useDeleteForumCommentMutation();
    const popup = document.getElementById(String("popupForumComment" + comment.id)) as HTMLDialogElement;
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
            <main className="forum-page-container">
                <div className="comment-header-container">
                    <p>{comment.createdBy.firstName + " " + comment.createdBy.lastName}</p>
                    <h5>{createdDate}</h5>
                </div>
                <p>{comment.text}</p>
                {role === "ADMIN" ? (
                    <div
                        style={{textAlign: 'center'}}
                    >
                        <button className="admin-btn edit-btn" onClick={() => popup.showModal()}>
                            Edit
                        </button>
                        <button className="admin-btn delete-btn" onClick={deleteComment}>
                            Delete
                        </button>
                    </div>
                ) : null}
                <dialog className="popup" id={"popupForumComment" + comment.id} onClick={close}>
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
