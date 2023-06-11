import "./News.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import {
  useGetAllNewsMutation,
  useCreateNewsMutation,
} from "../../store/auth/authApiSlice";
import store from "../../store/store";

const theme = createTheme();

export default function News() {
  const [getAllNews] = useGetAllNewsMutation();
  const [createNewsCall] = useCreateNewsMutation();
  const email = store.getState().auth.email;
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState({
    name: "",
    publishDate: "",
    desc: "",
    emailUser: email,
  });
  var popup = document.getElementById("popup");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/newsPage";
    navigate(path);
  };

  useEffect(() => {
    getAllNews().then((res) => {
      setNews(res.data);
    });
  }, []);

  const updateNewNewsName = (value) => {
    const newNewsCopy = { ...newNews };
    newNewsCopy.name = value;
    setNewNews(newNewsCopy);
  };

  const updateNewNewsText = (value) => {
    const newNewsCopy = { ...newNews };
    newNewsCopy.desc = value;
    setNewNews(newNewsCopy);
  };

  const createNewNews = () => {
    newNews.publishDate =
      new Date().toLocaleDateString("uk-UA") +
      " " +
      new Date().toLocaleTimeString("uk-UA").slice(0, 5);
    createNewsCall(newNews);
    window.location.reload();
  };

  const openPopup = () => {
    popup.classList.add("open-popupNews");
  };

  return (
    <Box sx={{ backgroundColor: "#BC2044" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth="none"
          disableGutters
          sx={{ display: "table", tableLayout: "fixed" }}
        >
          <Box className="main-box" onClick={routeChange}>
            <img
              src="https://source.unsplash.com/random/?sport/1"
              alt="new-img1"
              className="main-box-img"
            ></img>
            <ArrowForwardIcon fontSize="large" className="main-box-arrow" />
            <Typography sx={{ fontSize: "32px" }} className="main-box-text">
              The top 10 hiking trails in Maine
            </Typography>
          </Box>
          <Box
            className="main-box"
            onClick={() => {
              alert("Clicked");
            }}
          >
            <img
              src="https://source.unsplash.com/random/?sport/2"
              alt="new-img1"
              className="main-box-img"
            ></img>
            <ArrowForwardIcon fontSize="large" className="main-box-arrow" />
            <Typography sx={{ fontSize: "32px" }} className="main-box-text">
              The top 10 hiking trails in Maine
            </Typography>
          </Box>
          <Box
            className="main-box"
            onClick={() => {
              alert("Clicked");
            }}
          >
            <img
              src="https://source.unsplash.com/random/?sport/3"
              alt="new-img1"
              className="main-box-img"
            ></img>
            <ArrowForwardIcon fontSize="large" className="main-box-arrow" />
            <Typography sx={{ fontSize: "32px" }} className="main-box-text">
              The top 10 hiking trails in Maine
            </Typography>
          </Box>
        </Container>

        <div
          style={{
            paddingTop: "1em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button className="createNewNewsButton" onClick={openPopup}>
            Створити новину
          </button>
          <div className="popupNews" id="popup">
            <button
              id="closeNewNews"
              onClick={() => {
                popup.classList.remove("open-popupNews");
              }}
            >
              close
            </button>
            <h2 style={{ marginTop: "-1em" }}>Створення новини</h2>
            <div>
              <p style={{ margin: 0, fontSize: "20px", padding: "0.5em" }}>
                Введіть назву
              </p>
              <textarea
                style={{
                  width: "40em",
                  height: "5em",
                  resize: "none",
                  borderRadius: "0.25em",
                }}
                onChange={(e) => updateNewNewsName(e.target.value)}
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
              <p style={{ margin: 0, fontSize: "20px", padding: "0.5em" }}>
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
                onChange={(e) => updateNewNewsText(e.target.value)}
              ></textarea>
            </div>
            <button
              className="createNewNewsButton"
              type="submit"
              onClick={createNewNews}
            >
              Створити
            </button>
          </div>
        </div>

        <Container maxWidth="lg" sx={{ mt: "64px" }}>
          <main style={{ paddingBottom: "1%" }}>
            {news.slice(0, 1).map((post) => (
              <MainFeaturedPost key={post.name} post={post} />
            ))}
            <Grid container spacing={3} columns={1}>
              {news.slice(1).map((post) => (
                <FeaturedPost key={post.name} post={post} />
              ))}
            </Grid>
          </main>
        </Container>
      </ThemeProvider>
    </Box>
  );
}
