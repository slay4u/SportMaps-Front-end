import "./News.css";
import React, { useEffect, useState } from "react";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import {
  useGetAllNewsMutation,
  useCreateNewsMutation,
} from "../../store/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentEmail, selectCurrentRole } from "../../store/auth/authSlice";

export default function News() {
  const [getAllNews] = useGetAllNewsMutation();
  const [createNewsCall] = useCreateNewsMutation();
  const email = useSelector(selectCurrentEmail);
  const role = useSelector(selectCurrentRole);
  const [news, setNews] = useState([]);
  const newsReverse = news ? [...news].reverse() : [];
  const [newNews, setNewNews] = useState({
    name: "",
    publishDate: "",
    desc: "",
    emailUser: email
  });
  const navigate = useNavigate();
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  
  const routeChange = () => {
    navigate("/newsPage");
  };

  const openPopup = () => {
    popup.classList.add("active");
    overlay.classList.add("active");
  };

  const closePopup = () => {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  };

  useEffect(() => {
    getAllNews({}).then((res: {data: typeof news}) => {
      setNews(res.data);
    });
  }, []);

  const updateNewNewsName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNews({ ...newNews, name: event.target.value });
  };

  const updateNewNewsText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNews({ ...newNews, desc: event.target.value })
  };

  const createNewNews = () => {
    newNews.publishDate =
      new Date().toLocaleDateString("uk-UA") +
      " " +
      new Date().toLocaleTimeString("uk-UA").slice(0, 5);
    createNewsCall(newNews);
    window.location.reload();
  };

  return (
    <>
      <main className="news-main-box">
          <div className="news-img-container">
            <div className="news-img-item" onClick={routeChange}>
              <img
                className="news-img"
                src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80"
                alt="first image"
              ></img>
              <span className="news-img-arrow">
                <ArrowForwardIcon sx={{ fontSize: '4rem' }}/>
              </span>
              <p className="news-img-text">
                The top 10 hiking trails in Maine
              </p>
            </div>
            <div className="news-img-item" onClick={routeChange}>
              <img
                className="news-img"
                src="https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
                alt="first image"
              ></img>
              <span className="news-img-arrow">
                <ArrowForwardIcon sx={{ fontSize: '4rem' }}/>
              </span>
              <p className="news-img-text">
                The top 10 hiking trails in Maine
              </p>
            </div>
            <div className="news-img-item" onClick={routeChange}>
              <img
                className="news-img"
                src="https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="first image"
              ></img>
              <span className="news-img-arrow">
                <ArrowForwardIcon sx={{ fontSize: '4rem' }}/>
              </span>
              <p className="news-img-text">
                The top 10 hiking trails in Maine
              </p>
            </div>
          </div>
          {role === "ADMIN" ? (
            <div className="news-create-btn-container">
              <button
                className="create-new-news-btn"
                onClick={openPopup}
              >
                Створити новину
              </button>
              <div className="news-create-popup" id="popup">
                <button
                  id="close-news-popup"
                  onClick={closePopup}
                >
                </button>
                <h2>Створення новини</h2>
                <div>
                  <p>Введіть назву</p>
                  <textarea
                    id="name-textarea"
                    onChange={updateNewNewsName} 
                    value={newNews.name}
                  ></textarea>
                </div>
                <hr/>
                <div>
                  <p>Введіть текст</p>
                  <textarea
                    id="text-textarea"
                    onChange={updateNewNewsText}
                    value={newNews.desc}
                  ></textarea>
                </div>
                <button
                  className="create-new-news-btn"
                  type="submit"
                  onClick={createNewNews}
                >
                  Створити
                </button>
              </div>
              <div className="overlay" id="overlay" onClick={closePopup}></div>
            </div>
          ) : (
            ""
          )}
          <div className="news-grid-container">
              {newsReverse && newsReverse.slice(0, 1).map((post) => (
                <MainFeaturedPost key={post.name} post={post} />
              ))}
              <div className="news-grid">
                {newsReverse && newsReverse.slice(1).map((post) => (
                  <FeaturedPost key={post.name} post={post} />
                ))}
              </div>
          </div>
      </main>
    </>
  );
}
