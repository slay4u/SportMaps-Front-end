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
  const popup = document.querySelector("dialog");
  
  const routeChange = () => {
    navigate("/newsPage");
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

  useEffect(() => {
    getAllNews({}).then((res: {data: typeof news}) => {
      setNews(res.data);
    });
  }, []);

  const updateNewNewsName = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <main>
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
            <div className="create-btn-container">
              <button
                className="admin-btn create-btn"
                onClick={() => popup.showModal()}
              >
                Створити новину
              </button>
              
            </div>
          ) : null}
          <div>
              {newsReverse && newsReverse.slice(0, 1).map((post) => (
                <MainFeaturedPost key={post.name} post={post} />
              ))}
              <div className="template-grid">
                {newsReverse && newsReverse.slice(1).map((post) => (
                  <FeaturedPost key={post.name} post={post} />
                ))}
              </div>
          </div>
          <dialog className="popup" onClick={close}>
            <div 
              className="closeBtn"
              onClick={() => popup.close()}
            ></div>
            <h4>Створення новини</h4>
            <div>
              <p>Введіть назву</p>
              <input
                onChange={updateNewNewsName} 
                value={newNews.name}
              ></input>
              <p>Введіть текст</p>
              <textarea
                onChange={updateNewNewsText}
                value={newNews.desc}
              ></textarea>
            </div>
            <button
              className="admin-btn create-btn"
              type="submit"
              onClick={createNewNews}
            >
              Створити
            </button>
          </dialog>
      </main>
    </>
  );
}
