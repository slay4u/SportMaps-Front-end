import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  useDeleteNewsCommentMutation,
  useUpdateNewsCommentMutation,
} from "../../store/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../../store/auth/authSlice";

function NewsComment(prop: PropTypes.InferProps<typeof NewsComment.propTypes>) {
  const { comment } = prop;
  const role = useSelector(selectCurrentRole);
  const [deleteCommentCall] = useDeleteNewsCommentMutation();
  const [updateCommentCall] = useUpdateNewsCommentMutation();
  const mounth =
    new String(comment.createdDate[1]).length == 1
      ? "0" + new String(comment.createdDate[1])
      : new String(comment.createdDate[1]);
  const day =
    new String(comment.createdDate[2]).length == 1
      ? "0" + new String(comment.createdDate[2])
      : new String(comment.createdDate[2]);
  const hours =
    new String(comment.createdDate[3]).length == 1
      ? "0" + new String(comment.createdDate[3])
      : new String(comment.createdDate[3]);
  const minutes =
    new String(comment.createdDate[4]).length == 1
      ? "0" + new String(comment.createdDate[4])
      : new String(comment.createdDate[4]);
  const createdDate =
    day +
    "." +
    mounth +
    "." +
    new String(comment.createdDate[0]) +
    " " +
    hours +
    ":" +
    minutes;
  const popup = document.getElementById("popupComment");
  const overlay = document.getElementById("overlayComment");
  const commentId = comment.id;
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
    updateCommentCall({ commentId, updateComment });
    window.location.reload();
  };

  const openPopup = () => {
    popup.classList.add("active");
    overlay.classList.add("active");
  };

  const closePopup = () => {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  };

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
              onClick={openPopup}
            >
              Редагувати
            </button>
            <button
              className="create-new-news-btn news-comment-delete-btn"
              onClick={deleteComment}
            >
              Видалити
            </button>
            <div className="news-create-popup" id="popupComment">
              <button id="close-news-popup" onClick={closePopup}></button>
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
            </div>
            <div className="overlay" id="overlayComment" onClick={closePopup}></div>
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

export default NewsComment;
