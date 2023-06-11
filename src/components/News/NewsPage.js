import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { useNavigate } from "react-router-dom";
import store from "../../store/store";
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
  const email = store.getState().auth.email;
  const newsId = parseInt(window.location.href.slice(31));
  const [news, setNews] = useState({ commentList: [] });
  const [authorName, setAuthorName] = useState("");
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
  var popup = document.getElementById("popup");

  useEffect(() => {
    newsCall(newsId).then((res) => {
      setNews(res.data);
      authorCall(res.data.emailUser).then((response) => {
        setAuthorName(response.data.firstName + " " + response.data.lastName);
      });
    });
  }, []);

  function updateComment(value) {
    const commentCopy = { ...comment };
    commentCopy.text = value;
    setComment(commentCopy);
  }

  const updateNewsName = (value) => {
    const newNewsCopy = { ...updateNews };
    newNewsCopy.name = value;
    setUpdateNews(newNewsCopy);
  };

  const updateNewsText = (value) => {
    const newNewsCopy = { ...updateNews };
    newNewsCopy.desc = value;
    setUpdateNews(newNewsCopy);
  };

  const editNews = () => {
    updateNews.publishDate =
      new Date().toLocaleDateString("uk-UA") +
      " " +
      new Date().toLocaleTimeString("uk-UA").slice(0, 5);
    updateNews.emailUser = news.emailUser;
    updateCall({ newsId, updateNews });
    window.location.reload();
  };

  const openPopup = () => {
    popup.classList.add("open-popupNews");
  };

  const submitComment = () => {
    comment.createdDate =
      new Date().toLocaleDateString("uk-UA") +
      " " +
      new Date().toLocaleTimeString("uk-UA").slice(0, 5);
    commentCall(comment);
    window.location.reload();
  };

  let navigate = useNavigate();
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
      <Box sx={{ backgroundColor: "#CC7338" }}>
        <Container maxWidth="xl" sx={{ minHeight: "970px" }}>
          <main>
            <img
              src="https://source.unsplash.com/random/?sport/"
              alt="sport-img"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "750px",
                filter: "brightness(60%)",
              }}
            ></img>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h3"
                sx={{
                  pl: "5%",
                  mb: "1%",
                  width: "60%",
                  fontWeight: "bold",
                }}
              >
                {news.name}
              </Typography>
              <Button
                sx={{
                  width: "7%",
                  height: "5%",
                  borderRadius: 4.5,
                  bgcolor: "black",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  ml: "27.5%",
                  mt: "1%",
                  transition: "all 0.3s",
                  ":hover": {
                    bgcolor: "rgb(0, 102, 204)",
                    transform: "scale(1.04)",
                  },
                }}
                onClick={() => {
                  alert("Clicked");
                }}
              >
                Save
                <Typography
                  sx={{ ml: "5%", display: "flex", alignContent: "center" }}
                >
                  <TurnedInNotIcon fontSize="small" />
                </Typography>
              </Button>

              <div
                style={{
                  paddingTop: "1em",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className="popupNews" id="popup">
                  <button
                    id="closeNewNews"
                    onClick={() => {
                      popup.classList.remove("open-popupNews");
                    }}
                  >
                    close
                  </button>
                  <h2 style={{ marginTop: "-1em" }}>Редагування новини</h2>
                  <div>
                    <p
                      style={{ margin: 0, fontSize: "20px", padding: "0.5em" }}
                    >
                      Введіть назву
                    </p>
                    <textarea
                      style={{
                        width: "40em",
                        height: "5em",
                        resize: "none",
                        borderRadius: "0.25em",
                      }}
                      onChange={(e) => updateNewsName(e.target.value)}
                    ></textarea>
                  </div>
                  <hr
                    style={{
                      height: "1px",
                      borderColor: "#000000",
                      marginTop: "1em",
                    }}
                  />
                  <div style={{ paddingBottom: "0.5em", marginTop: "0.5em" }}>
                    <p
                      style={{ margin: 0, fontSize: "20px", padding: "0.5em" }}
                    >
                      Введіть текст
                    </p>
                    <textarea
                      style={{
                        minWidth: "50em",
                        minHeight: "15em",
                        maxWidth: "80em",
                        maxHeight: "35em",
                        borderRadius: "0.25em",
                      }}
                      onChange={(e) => updateNewsText(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    className="createNewNewsButton"
                    type="submit"
                    onClick={editNews}
                  >
                    Редагувати
                  </button>
                </div>
              </div>

              <div
                style={{
                  marginTop: "5em",
                  marginLeft: "77em",
                  position: "absolute",
                }}
              >
                <button
                  className="createNewNewsButton"
                  style={{ backgroundColor: "blue", borderColor: "blue" }}
                  onClick={openPopup}
                >
                  Редагувати
                </button>
              </div>
              <div
                style={{
                  marginTop: "5em",
                  marginLeft: "86em",
                  position: "absolute",
                }}
              >
                <button
                  className="createNewNewsButton"
                  style={{ backgroundColor: "red", borderColor: "red" }}
                  onClick={deleteNews}
                >
                  Видалити
                </button>
              </div>
            </Box>
            <Box sx={{ display: "flex", pl: "5%" }}>
              <Avatar
                sx={{ width: "3em", height: "3em" }}
                src="https://source.unsplash.com/random/?avatar/"
                alt="author"
              ></Avatar>
              <Box sx={{ ml: "1em" }}>
                <Typography>{authorName}</Typography>
                <Divider />
                <Typography>
                  {new Date(news.publishDate).toLocaleDateString("uk-UA") +
                    " " +
                    new Date(news.publishDate).toLocaleTimeString("uk-UA").slice(0, 5)}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mt: "1em", backgroundColor: "black" }} />
            <Box sx={{ pt: "2em", pl: "1em", pr: "0.7em" }}>
              <Typography
                variant="subtitle1"
                paragraph
                sx={{ fontSize: "25px" }}
              >
                {news.desc}
              </Typography>
            </Box>
            <div style={{ height: "2em" }}>
              <Divider sx={{ backgroundColor: "black" }} />
            </div>
            <div style={{ width: "50%", paddingLeft: "1em" }}>
              <Typography variant="h5" sx={{ height: "1.5em" }}>
                Коментарі
              </Typography>
              <textarea
                id="newsCommentArea"
                style={{
                  minWidth: "40em",
                  minHeight: "5em",
                  maxWidth: "60em",
                  maxHeight: "15em",
                  borderRadius: "0.25em",
                }}
                onChange={(e) => updateComment(e.target.value)}
              ></textarea>
              <div style={{ marginTop: "0.3em" }}>
                <button
                  id="newsCommentsSubmit"
                  type="submit"
                  onClick={submitComment}
                >
                  Надіслати
                </button>
              </div>
              <Grid
                container
                spacing={2}
                columns={1}
                sx={{ mt: "1em", pb: "1em", width: "100%" }}
              >
                {news.commentList &&
                  news.commentList.map((comment) => (
                    <NewsComment key={comment.id} comment={comment} />
                  ))}
              </Grid>
            </div>
          </main>
        </Container>
      </Box>
    </>
  );
}
