import React, { useRef } from "react";
import {LoginOutlined} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../store/auth/authSlice";
import {useLoginMutation} from "../../store/auth/authApiSlice";
import "./user.css";

export default function SignIn() {
    const email = useRef(null);
    const password = useRef(null);
    const errMsg = "Error";
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const userData = await login({email: email.current.value, password: password.current.value}).unwrap();
            dispatch(setCredentials({...userData, email: email.current.value}));
            navigate(from, {replace: true});
        } catch (err) {
            alert(errMsg);
        }
    };

    return (<main className="center-container sign-container">
        <div className="signUserFormContainer">
            <div className="signUserFormAvatar">
                <LoginOutlined sx={{fontSize: "2.5rem"}}/>
            </div>
            <h4>Sign In</h4>
            <div className="sign-input-container">
                <input
                    required
                    type="text"
                    autoComplete="off"
                    ref={email}
                />
                <label>Email</label>
            </div>
            <div className="sign-input-container">
                <input
                    required
                    type="password"
                    autoComplete="off"
                    ref={password}
                />
                <label>Password</label>
            </div>
            <button
                className="signUserFormButton"
                type="submit"
                onClick={handleSubmit}
            >
                Sign In
            </button>
            <div className="signUserFormLinkContainer">
                <a href="/signup"><h5>Don&apos;t have an account? Sign up</h5></a>
            </div>
        </div>
    </main>);
}
