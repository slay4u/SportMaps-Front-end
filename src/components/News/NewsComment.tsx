import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  useDeleteNewsCommentMutation,
  useUpdateNewsCommentMutation,
} from "../../store/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../../store/auth/authSlice";
import "./News.css";

export default function NewsComment(prop: PropTypes.InferProps<typeof NewsComment.propTypes>) {
  const { comment } = prop;
  const role = useSelector(selectCurrentRole);
  const [deleteCommentCall] = useDeleteNewsCommentMutation();
  const [updateCommentCall] = useUpdateNewsCommentMutation();
  const month =
    String(comment.createdDate[1]).length == 1
      ? "0" + String(comment.createdDate[1])
      : String(comment.createdDate[1]);
  const day =
    String(comment.createdDate[2]).length == 1
      ? "0" + String(comment.createdDate[2])
      : String(comment.createdDate[2]);
  const hours =
    String(comment.createdDate[3]).length == 1
      ? "0" + String(comment.createdDate[3])
      : String(comment.createdDate[3]);
  const minutes =
    String(comment.createdDate[4]).length == 1
      ? "0" + String(comment.createdDate[4])
      : String(comment.createdDate[4]);
  const createdDate =
    day +
    "." +
    month +
    "." +
    String(comment.createdDate[0]) +
    " " +
    hours +
    ":" +
    minutes;
  const popup = document.getElementById(String("dialogComment" + comment.id)) as HTMLDialogElement;
  const [updateComment, setUpdateComment] = useState({
    createdDate: "",
    emailUser: "",
    idNew: 0,
    text: "",
  });

  const deleteComment = () => {
    deleteCommentCall(comment.id);
    window.location.reload();
  };

  const updateNewsText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateComment({ ...updateComment, text: event.target.value });
  };

  const editComment = () => {
    updateComment.createdDate =
      new Date().toLocaleDateString("uk-UA") +
      " " +
      new Date().toLocaleTimeString("uk-UA").slice(0, 5);
    updateComment.emailUser = comment.createdBy.email;
    updateComment.idNew = comment.news.idNew;
    updateCommentCall({ commentId: comment.id, updateComment });
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
          </div>
        ) : null}
        <dialog className="popup" id={"dialogComment" + comment.id} onClick={close}>
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
    </>
  );
}

NewsComment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    createdDate: PropTypes.array.isRequired,
    createdBy: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }),
    news: PropTypes.shape({
      idNew: PropTypes.number.isRequired
    }),
    text: PropTypes.string.isRequired
  }).isRequired,
};
