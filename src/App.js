import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/Home';
import SignIn from './components/UserForms/SignInForm';
import SignUp from './components/UserForms/SignUpForm';
import NoMatch from './components/404/NoMatch';
import NavigationBar from './components/NavBar/NavBar';
import Maps from './components/Maps/Maps';
import News from './components/News/News';
import Coaches from './components/Coaches/Coaches';
import Forums from './components/Forums/Forums';
import AboutUs from './components/AboutUs/AboutUs';
import Layout from './components/layout/Layout';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/news" element={<News />} />
            <Route path="/coaches" element={<Coaches />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
