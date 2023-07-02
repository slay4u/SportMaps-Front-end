import React, { useState, useEffect } from "react";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentEmail, selectCurrentRole } from "../../store/auth/authSlice";
import {
  useNewsCommentMutation,
  useGetNewsByIdMutation,
  useGetUserByEmailMutation,
  useDeleteNewsMutation,
  useDeleteNewsCommentMutation,
  useUpdateNewsMutation,
} from "../../store/auth/authApiSlice";
import NewsComment from "./NewsComment";

export default function NewsPage() {
  const [commentCall] = useNewsCommentMutation();
  const [newsCall] = useGetNewsByIdMutation();
  const [authorCall] = useGetUserByEmailMutation();
  const [deleteCall] = useDeleteNewsMutation();
  const [deleteCommentCall] = useDeleteNewsCommentMutation();
  const [updateCall] = useUpdateNewsMutation();
  const email = useSelector(selectCurrentEmail);
  const role = useSelector(selectCurrentRole);
  const newsId = parseInt(window.location.href.slice(31));
  const [authorName, setAuthorName] = useState("");
  const [news, setNews] = useState({ 
    name: "",
    publishDate: "",
    desc: "",
    emailUser: "",
    commentList: [] 
  });
  const [comment, setComment] = useState({
    text: "",
    idNew: newsId,
    emailUser: email,
    createdDate: "",
  });
  const [updateNews, setUpdateNews] = useState({
    name: "",
    publishDate: "",
    desc: "",
    emailUser: "",
  });
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const newsDate =
    new Date(news.publishDate).toLocaleDateString("uk-UA") +
    " " +
    new Date(news.publishDate).toLocaleTimeString("uk-UA").slice(0, 5);

  useEffect(() => {
    newsCall(newsId).then((res: { data: typeof news }) => {
      setNews(res.data);
      authorCall(res.data.emailUser).then((response: { data: { firstName: "", lastName: "" } }) => {
        setAuthorName(response.data.firstName + " " + response.data.lastName);
      });
    });
  }, []);

  function getCurrentDate() {
    return (
      new Date().toLocaleDateString("uk-UA") +
      " " +
      new Date().toLocaleTimeString("uk-UA").slice(0, 5)
    );
  }

  const openPopup = () => {
    popup.classList.add("active");
    overlay.classList.add("active");
  };

  const closePopup = () => {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  };

  const updateComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment({ ...comment, text: event.target.value });
  };

  const updateNewsName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateNews({ ...updateNews, name: event.target.value });
  };

  const updateNewsText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateNews({ ...updateNews, desc: event.target.value });
  };

  const editNews = () => {
    updateNews.publishDate = getCurrentDate();
    updateNews.emailUser = news.emailUser;
    updateCall({ newsId, updateNews });
    window.location.reload();
  };

  const submitComment = () => {
    comment.createdDate = getCurrentDate();
    commentCall(comment);
    window.location.reload();
  };

  const navigate = useNavigate();
  const deleteNews = () => {
    if (news.commentList != null) {
      news.commentList.map((comment) => {
        deleteCommentCall(comment.id);
      });
    }
    deleteCall(newsId);
    setTimeout(() => {
      navigate("/news");
    }, 1000);
  };

  return (
    <>
      <main className="news-page-main-box">
        <div className="news-page-content-container">
          <img
            className="news-page-img"
            src="https://source.unsplash.com/random/?sport/"
            alt="sport-img"
          ></img>
          <div className="news-page-title-section">
            <h1>{news.name}</h1>
            <button id="news-page-save-btn">
              Save
              <TurnedInNotIcon sx={{fontSize: "2rem"}} />
            </button>
            {role === "ADMIN" ? (
              <>
                <button
                  className="create-new-news-btn news-page-edit-text-btn"
                  onClick={openPopup}
                >
                  Редагувати
                </button>
                <button
                  className="create-new-news-btn news-page-delete-text-btn"
                  onClick={deleteNews}
                >
                  Видалити
                </button>
                <div className="news-create-popup" id="popup">
                  <button id="close-news-popup" onClick={closePopup}></button>
                  <h2>Редагування новини</h2>
                  <div>
                    <p>Введіть назву</p>
                    <textarea
                      id="name-textarea"
                      onChange={updateNewsName}
                      value={updateNews.name}
                    ></textarea>
                  </div>
                  <hr />
                  <div>
                    <p>Введіть текст</p>
                    <textarea
                      id="text-textarea"
                      onChange={updateNewsText}
                      value={updateNews.desc}
                    ></textarea>
                  </div>
                  <button
                    className="create-new-news-btn"
                    type="submit"
                    onClick={editNews}
                  >
                    Редагувати
                  </button>
                </div>
                <div className="overlay" id="overlay" onClick={closePopup}></div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="news-page-author-section">
            <img
              id="news-page-author-avatar"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="author-avatar"
            ></img>
            <div className="news-page-author-info">
              <p>{authorName}</p>
              <hr id="news-page-divider" />
              <p>{newsDate}</p>
            </div>
          </div>
          <hr id="news-page-divider" />
          <p className="news-page-text">{news.desc}</p>
          <hr id="news-page-divider" />

          <div className="news-page-comment-section">
            <p className="news-page-comment-title">Коментарі</p>
            <textarea
              id="news-page-comment-area"
              onChange={updateComment}
            ></textarea>
            <button
              id="news-page-comment-btn"
              type="submit"
              onClick={submitComment}
            >
              Надіслати
            </button>
            <div className="news-page-comment-grid">
              {news.commentList &&
                news.commentList.map((comment) => (
                  <NewsComment key={comment.id} comment={comment} />
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
