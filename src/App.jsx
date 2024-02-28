import React, {lazy, Suspense} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import NavigationBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import RequireAuth from './components/RequireAuth'
import {CircularProgress} from '@mui/material'

const SignIn = lazy(() => import('./components/Forms/SignIn'))
const SignUp = lazy(() => import('./components/Forms/SignUp'))
const NoMatch = lazy(() => import('./components/404/NoMatch'))
const Maps = lazy(() => import('./components/Maps/Maps'))
const News = lazy(() => import('./components/News/News'))
const Coaches = lazy(() => import('./components/Coaches/Coaches'))
const Forums = lazy(() => import('./components/Forums/Forums'))
const AboutUs = lazy(() => import('./components/AboutUs/AboutUs'))
const NewsPage = lazy(() => import('./components/News/NewsPage'))
const ForumPage = lazy(() => import('./components/Forums/ForumPage'))
const UserProfile = lazy(() => import('./components/Profile/UserProfile'))
const Events = lazy(() => import('./components/Events/Events'))
const ContactPage = lazy(() => import('./components/ContactUs/ContactPage'))
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicy/PrivacyPolicyPage'))
const TermsAndConditionsPage = lazy(() => import('./components/TermsAndConditions/TermsAndConditionsPage'))
const DisclaimerPage = lazy(() => import('./components/Disclaimer/DisclaimerPage'))
const VerificationPage = lazy(() => import('./components/Verification/VerificationPage'))
const EventPage = lazy(() => import('./components/Events/EventPage'))
const Unauthorized = lazy(() => import('./components/401/Unauthorized'))
const EditorPage = lazy(() => import('./components/Editor/EditorPage'))

export default function App() {
    return <>
        <NavigationBar/>
        <Suspense fallback={<CircularProgress/>}>
            <Routes>
                <Route path="/" element={<Outlet/>}>
                    <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']}/>}>
                        <Route path="/profile" element={<UserProfile/>}/>
                        <Route path="/editor" element={<EditorPage/>}/>
                        <Route path="/editor/:id" element={<EditorPage/>}/>
                    </Route>
                    <Route path="/events" element={<Events/>}/>
                    <Route path="/events/:id" element={<EventPage/>}/>
                    <Route path="/maps" element={<Maps/>}/>
                    <Route path="/forums" element={<Forums/>}/>
                    <Route path="/forums/:id" element={<ForumPage/>}/>
                    <Route path="/" element={<News/>}/>
                    <Route path="/news/:id" element={<NewsPage/>}/>
                    <Route path="/coaches" element={<Coaches/>}/>
                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                    <Route path="/about" element={<AboutUs/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="/privacy" element={<PrivacyPolicyPage/>}/>
                    <Route path="/terms" element={<TermsAndConditionsPage/>}/>
                    <Route path="/disclaimer" element={<DisclaimerPage/>}/>
                    <Route path="/unauthorized" element={<Unauthorized/>}/>
                    <Route path="/verification/:id" element={<VerificationPage/>}/>
                </Route>
            </Routes>
        </Suspense>
        <Footer/>
    </>
}
