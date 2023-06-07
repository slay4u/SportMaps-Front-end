import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import "./chat.css";

var stompClient = null;
const ChatRoom = () => {
  const [userData, setUserData] = useState({
    username: "",
    connected: false,
    message: "",
  });
  var messageArea = null;
  var colors = [
    "#2196F3",
    "#32c787",
    "#00BCD4",
    "#ff5652",
    "#ffc107",
    "#ff85af",
    "#FF9800",
    "#39bbb0",
  ];

  useEffect(() => {
    messageArea = document.getElementById("messageArea");
  }, []);

  const connect = (event) => {
    let Sock = new SockJS("http://localhost:8090/sport-maps/v1/chat");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    event.preventDefault();
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      sender: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onError = (err) => {
    console.log(err);
    alert("Couldn't connect to WebSocket. Please, try again later.");
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        sender: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    var messageElement = document.createElement("li");
    messageArea = document.getElementById("messageArea");
    switch (payloadData.status) {
      case "JOIN":
        messageElement.classList.add("event-message");
        payloadData.message = payloadData.sender + " joined!";
        break;
      case "LEAVE":
        messageElement.classList.add("event-message");
        payloadData.message = payloadData.sender + " left!";
        break;
      case "MESSAGE":
        messageElement.classList.add("chat-message");
        var avatarElement = document.createElement("i");
        var avatarText = document.createTextNode(payloadData.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style["background-color"] = getAvatarColor(
          payloadData.sender
        );
        messageElement.appendChild(avatarElement);
        var usernameElement = document.createElement("span");
        var usernameText = document.createTextNode(payloadData.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
        break;
    }
    var textElement = document.createElement("p");
    textElement.appendChild(document.createTextNode(payloadData.message));
    messageElement.appendChild(textElement);
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
  };

  function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
  }

  window.onbeforeunload = function () {
    if (stompClient) {
      var chatMessage = {
        sender: userData.username,
        status: "LEAVE",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  return (
    <>
      {userData.connected ? (
        <main id="messagePage">
          <div id="messageContainer">
            <h1 id="chatRoomHeader">Sport-Maps ChatRoom</h1>
            <ul id="messageArea"></ul>
            <input
              type="text"
              placeholder="type your message"
              autoComplete="off"
              id="messageInput"
              value={userData.message}
              onChange={handleMessage}
            />
            <button
              type="submit"
              className="sendMessageButton third"
              onClick={sendValue}
            >
              Send
            </button>
          </div>
        </main>
      ) : (
        <main id="usernamePage">
          <div id="usernameContainer">
            <h1 id="startChatHeader">Type your username</h1>
            <ul id="messageArea" className="hidden"></ul>
            <input
              type="text"
              placeholder="username"
              autoComplete="off"
              id="usernameInput"
              value={userData.username}
              onChange={handleUsername}
            />
            <button type="submit" className="startChatButton" onClick={connect}>
              Let&apos;s chat!
            </button>
          </div>
        </main>
      )}
    </>
  );
};

export default ChatRoom;
