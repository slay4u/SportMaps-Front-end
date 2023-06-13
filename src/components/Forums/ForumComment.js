import React, { useState } from "react";
import {
  useDeleteForumCommentMutation,
  useEditForumCommentMutation,
} from "../../store/auth/authApiSlice";
import store from "../../store/store";

export default function ForumComment(prop) {
  const { comment } = prop;
  const [deleteCommentCall] = useDeleteForumCommentMutation();
  var popup = document.getElementById("popupForumComment");
  const [editForumCommentCall] = useEditForumCommentMutation();
  const role = store.getState().auth.role;
  var commentId = comment.id;
  var emailUser = comment.createdBy.email;
  var idForum = comment.forum.idForum;
  const [updateForumComment, setUpdateForumComment] = useState({
    createdDate:
      new Date().toLocaleDateString("uk-UA") +
      " " +
      new Date().toLocaleTimeString("uk-UA").slice(0, 5),
    text: "",
    emailUser: comment.emailUser,
    idForum: comment.idForum,
  });
  let minutes =
    new String(comment.createdDate[4]).length == 1
      ? "0" + new String(comment.createdDate[4])
      : new String(comment.createdDate[4]);
  let hours =
    new String(comment.createdDate[3]).length == 1
      ? "0" + new String(comment.createdDate[3])
      : new String(comment.createdDate[3]);
  let months =
    new String(comment.createdDate[1]).length == 1
      ? "0" + new String(comment.createdDate[1])
      : new String(comment.createdDate[1]);
  let days =
    new String(comment.createdDate[2]).length == 1
      ? "0" + new String(comment.createdDate[2])
      : new String(comment.createdDate[2]);
  const createdDate =
    days +
    "." +
    months +
    "." +
    new String(comment.createdDate[0]) +
    " " +
    hours +
    ":" +
    minutes;

  const deleteComment = () => {
    deleteCommentCall(comment.id);
    window.location.reload();
  };

  const openPopup = () => {
    popup.classList.add("open-popupForums");
  };

  const handleText = (event) => {
    const { value } = event.target;
    setUpdateForumComment({ ...updateForumComment, text: value });
  };

  const editForumComment = () => {
    var newUpdateForumComment = {
      createdDate:
        new Date().toLocaleDateString("uk-UA") +
        " " +
        new Date().toLocaleTimeString("uk-UA").slice(0, 5),
      text: updateForumComment.text,
      emailUser: emailUser,
      idForum: idForum,
    };
    editForumCommentCall({ commentId, newUpdateForumComment });
    window.location.reload();
  };

  return (
    <>
      <main id="forumCommentJSPage">
        <div id="forumCommentJSContainer">
          <p id="forumCommentJSPar1">#{comment.id}</p>
          <p id="forumCommentJSPar2">
            {comment.createdBy.firstName} {comment.createdBy.lastName}
          </p>
        </div>
        <div id="forumCommentJSContainer1">
          <p id="forumCommentJSText">{comment.text}</p>
        </div>
        {role == "ADMIN" ? (
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
            <button id="forumCommentJSEditButton" onClick={openPopup}>
              Edit
            </button>
            <button id="forumCommentJSDeleteButton" onClick={deleteComment}>
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
          <div className="popupForums" id="popupForumComment">
            <button
              id="closeNewForum"
              onClick={() => {
                popup.classList.remove("open-popupForums");
              }}
            >
              close
            </button>
            <h1>Edit comment</h1>
            <div>
              <p>Input new text:</p>
              <textarea
                onChange={handleText}
                value={updateForumComment.text}
              ></textarea>
            </div>
            <button
              className="ForumsJSCreateNewForumButton"
              type="submit"
              onClick={editForumComment}
            >
              Edit
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
