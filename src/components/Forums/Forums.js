import React, { useState, useEffect } from "react";
import {
  useGetAllForumsMutation,
  useCreateNewForumMutation,
} from "../../store/auth/authApiSlice";
import FeaturedTopic from "./FeaturedTopic";
import Grid from "@mui/material/Grid";
import "./forums.css";
import store from "../../store/store";

export default function Forums() {
  const [getAllForums] = useGetAllForumsMutation();
  const [createNewForum] = useCreateNewForumMutation();
  const [forums, setForums] = useState([]);
  var popup = document.getElementById("popup");
  const email = store.getState().auth.email;
  const [newForum, setNewForum] = useState({
    name: "",
    createDate:
      new Date().toLocaleDateString("uk-UA") +
      " " +
      new Date().toLocaleTimeString("uk-UA").slice(0, 5),
    desc: "",
    emailUser: email,
  });

  useEffect(() => {
    getAllForums().then((res) => {
      setForums(res.data);
    });
  }, []);

  const openPopup = () => {
    popup.classList.add("open-popupForums");
  };

  const handleName = (event) => {
    const { value } = event.target;
    setNewForum({ ...newForum, name: value });
  };

  const handleText = (event) => {
    const { value } = event.target;
    setNewForum({ ...newForum, desc: value });
  };

  const sendValue = () => {
    var newForumSend = {
      name: newForum.name,
      createDate:
        new Date().toLocaleDateString("uk-UA") +
        " " +
        new Date().toLocaleTimeString("uk-UA").slice(0, 5),
      desc: newForum.desc,
      emailUser: email,
    };
    createNewForum(newForumSend);
    window.location.reload();
  };

  return (
    <>
      <main id="mainForumsPage">
        <div
          style={{ alignItems: "center", textAlign: "center", margin: "1em" }}
        >
          <button className="ForumsJSCreateNewForumButton" onClick={openPopup}>
            Create new forum
          </button>
        </div>
        <Grid container spacing={2} columns={1}>
          {forums &&
            forums
              .map((topic) => <FeaturedTopic key={topic.name} topic={topic} />)
              .reverse()}
        </Grid>
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
            <h1>New forum</h1>
            <div>
              <p>Input new name:</p>
              <input onChange={handleName} value={newForum.name}></input>
              <p>Input new text:</p>
              <textarea onChange={handleText} value={newForum.desc}></textarea>
            </div>
            <button
              className="ForumsJSCreateNewForumButton"
              type="submit"
              onClick={sendValue}
            >
              Create
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
