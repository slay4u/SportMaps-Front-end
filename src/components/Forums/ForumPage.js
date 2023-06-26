import React, { useEffect, useState } from "react";
import {
  useGetForumByIdMutation,
  useCreateForumCommentMutation,
  useGetUserFromForumMutation,
  useDeleteForumMutation,
  useDeleteForumCommentMutation,
  useEditForumMutation,
} from "../../store/auth/authApiSlice";
import store from "../../store/store";
import ForumComment from "./ForumComment";
import { useNavigate } from "react-router-dom";

export default function ForumPage() {
  const [forumCall] = useGetForumByIdMutation();
  const [userCall] = useGetUserFromForumMutation();
  const [deleteCall] = useDeleteForumMutation();
  const [deleteCommentsCall] = useDeleteForumCommentMutation();
  const [editCall] = useEditForumMutation();
  const [forum, setForum] = useState({ commentList: [] });
  const forumId = parseInt(window.location.href.slice(32));
  const email = store.getState().auth.email;
  const role = store.getState().auth.role;
  const [authorName, setAuthorName] = useState("");
  const [commentCall] = useCreateForumCommentMutation();
  const popup = document.getElementById("popup");
  const [updateForum, setUpdateForum] = useState({
    name: "",
    createDate:
      new Date().toLocaleDateString("uk-UA") +
      " " +
      new Date().toLocaleTimeString("uk-UA").slice(0, 5),
    desc: "",
    emailUser: forum.emailUser,
  });
  const createDate =
    new Date(forum.createDate).toLocaleDateString("uk-UA") +
    " " +
    new Date(forum.createDate).toLocaleTimeString("uk-UA").slice(0, 5);
  const [comment, setComment] = useState({
    text: "",
    idForum: forumId,
    emailUser: email,
    createdDate: "",
  });

  let navigate = useNavigate();
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
    popup.classList.add("open-popupForums");
  };

  useEffect(() => {
    forumCall(forumId).then((res) => {
      setForum(res.data);
      userCall(res.data.emailUser).then((response) => {
        setAuthorName(response.data.firstName + " " + response.data.lastName);
      });
    });
  }, []);

  function updateComment(value) {
    const commentCopy = { ...comment };
    commentCopy.text = value;
    setComment(commentCopy);
  }

  function submitComment() {
    comment.createdDate =
      new Date().toLocaleDateString("uk-UA") +
      " " +
      new Date().toLocaleTimeString("uk-UA").slice(0, 5);
    commentCall(comment);
    window.location.reload();
  }

  const handleName = (event) => {
    const { value } = event.target;
    setUpdateForum({ ...updateForum, name: value });
  };

  const handleText = (event) => {
    const { value } = event.target;
    setUpdateForum({ ...updateForum, desc: value });
  };

  const editForum = () => {
    const newUpdateForum = {
      name: updateForum.name,
      createDate:
          new Date().toLocaleDateString("uk-UA") +
          " " +
          new Date().toLocaleTimeString("uk-UA").slice(0, 5),
      desc: updateForum.desc,
      emailUser: forum.emailUser,
    };
    editCall({ forumId, newUpdateForum });
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
              <p id="forumPageJSTopicDate">{createDate}</p>
              <button id="forumPageJSTopicEditButton" onClick={openPopup}>
                Edit
              </button>
              <button onClick={deleteForum} id="forumPageJSTopicDeleteButton">
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
              <p id="forumPageJSTopicDate">{createDate}</p>
            </div>
          )}
        </div>
        <div id="forumPageJSTopicContainer3">
          <textarea
            id="forumCommentArea"
            onChange={(e) => updateComment(e.target.value)}
          ></textarea>
          <button
            id="forumPageJSTopicSubmitButton"
            onClick={() => submitComment()}
            type="submit"
          >
            Post comment
          </button>
        </div>
        <div>
          {forum.commentList &&
            forum.commentList.map((comment) => (
              <ForumComment key={comment.id} comment={comment} />
            ))}
        </div>
        <div
          style={{
            paddingTop: "1em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="popupForums" id="popup">
            <button
              id="closeNewForum"
              onClick={() => {
                popup.classList.remove("open-popupForums");
              }}
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
          </div>
        </div>
      </main>
    </>
  );
}
