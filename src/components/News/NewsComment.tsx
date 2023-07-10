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
  const modal = document.getElementById(String("dialogComment" + comment.id)) as HTMLDialogElement;
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

  const openModal = () => {
    modal.showModal();
  };

  const closeModal = () => {
    modal.close();
  };

  const close = () => {
    modal.addEventListener("click", e => {
      const dialogDimensions = modal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        modal.close();
      }
    })
  }

  return (
    <>
      <div className="news-page-comment-container">
        <div className="news-page-comment-content">
          <p className="news-page-comment-author">
            {comment.createdBy.firstName + " " + comment.createdBy.lastName}
          </p>
          <p className="news-page-comment-date">{createdDate}</p>
          <hr />
          <p className="news-page-comment-text">{comment.text}</p>
        </div>
        {role === "ADMIN" ? (
          <>
            <button
              className="create-new-news-btn news-comment-edit-btn"
              onClick={openModal}
            >
              Редагувати
            </button>
            <button
              className="create-new-news-btn news-comment-delete-btn"
              onClick={deleteComment}
            >
              Видалити
            </button>
            <dialog className="news-create-dialog" id={"dialogComment" + comment.id} onClick={close}>
              <button id="close-news-dialog" onClick={closeModal}></button>
              <h2>Редагування коментарію</h2>
              <div>
                <p>Введіть текст</p>
                <textarea
                  id="edit-comment-textarea"
                  onChange={updateNewsText}
                  value={updateComment.text}
                ></textarea>
              </div>
              <button
                className="create-new-news-btn"
                type="submit"
                onClick={editComment}
              >
                Редагувати
              </button>
            </dialog>
          </>
        ) : (
          ""
        )}
      </div>
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
