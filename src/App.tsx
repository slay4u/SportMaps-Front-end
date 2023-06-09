import React, {lazy, Suspense} from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/NavBar/NavBar";
import RequireAuth from "./components/RequireAuth";
import {CircularProgress} from "@mui/material";

const Home = lazy(() => import("./components/HomePage/Home"));
const SignIn = lazy(() => import("./components/UserForms/SignInForm"));
const SignUp = lazy(() => import("./components/UserForms/SignUpForm"));
const NoMatch = lazy(() => import("./components/404/NoMatch"));
const Maps = lazy(() => import("./components/Maps/Maps"));
const News = lazy(() => import("./components/News/News"));
const Coaches = lazy(() => import("./components/Coaches/Coaches"));
const Forums = lazy(() => import("./components/Forums/Forums"));
const AboutUs = lazy(() => import("./components/AboutUs/AboutUs"));
const ChatRoom = lazy(() => import("./components/chatroom/ChatRoom"));
const NewsPage = lazy(() => import("./components/News/NewsPage"));
const ForumPage = lazy(() => import("./components/Forums/ForumPage"));
const UserProfile = lazy(() => import("./components/UserForms/UserProfile"));
const Events = lazy(() => import("./components/Events/Events"));

export default function App() {
    return (<>
        <NavigationBar/>
        <Suspense fallback={<CircularProgress/>}>
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
        </Suspense>
    </>);
}
