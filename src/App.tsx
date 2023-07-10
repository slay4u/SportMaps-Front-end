import React from "react";
import {Route, Routes, Outlet} from "react-router-dom";
import Home from "./components/HomePage/Home";
import SignIn from "./components/UserForms/SignInForm";
import SignUp from "./components/UserForms/SignUpForm";
import NoMatch from "./components/404/NoMatch";
import NavigationBar from "./components/NavBar/NavBar";
import Maps from "./components/Maps/Maps";
import News from "./components/News/News";
import Coaches from "./components/Coaches/Coaches";
import Forums from "./components/Forums/Forums";
import AboutUs from "./components/AboutUs/AboutUs";
import RequireAuth from "./components/RequireAuth";
import ChatRoom from "./components/chatroom/ChatRoom";
import NewsPage from "./components/News/NewsPage";
import ForumPage from "./components/Forums/ForumPage";
import UserProfile from "./components/UserForms/UserProfile";
import Events from "./components/Events/Events";

export default function App() {
    return (<>
        <NavigationBar/>
        <Routes>
            <Route path="/" element={<Outlet/>}>
                <Route element={<RequireAuth/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<AboutUs/>}/>
                    <Route path="/maps" element={<Maps/>}/>
                    <Route path="/forums" element={<Forums/>}/>
                    <Route path="/forumPage/:id" element={<ForumPage/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/newsPage/:id" element={<NewsPage/>}/>
                    <Route path="/coaches" element={<Coaches/>}/>
                    <Route path="/profile" element={<UserProfile/>}/>
                    <Route path="/events" element={<Events/>}/>
                </Route>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="*" element={<NoMatch/>}/>
                <Route path="/chat" element={<ChatRoom/>}/>
            </Route>
        </Routes>
    </>);
}
