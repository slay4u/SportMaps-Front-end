import React, {useEffect, useState} from "react";
import {LoginOutlined} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../store/auth/authSlice";
import {useLoginMutation} from "../../store/auth/authApiSlice";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [login] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        setErrMsg("Something went wrong.");
    }, [email, password]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const userData = await login({email, password}).unwrap();
            dispatch(setCredentials({...userData, email}));
            setEmail("");
            setPassword("");
            navigate(from, {replace: true});
        } catch (err) {
            alert(errMsg);
        }
    };

    return (<>
        <main className="signUserFormBackground">
            <div className="signUserFormContainer">
                <div className="signUserFormAvatar">
                    <LoginOutlined sx={{fontSize: "2.5rem"}}/>
                </div>
                <p>Sign In</p>
                <div className="sign-input-container">
                    <input
                        required
                        type="text"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email</label>
                </div>
                <div className="sign-input-container">
                    <input
                        required
                        type="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <a className="signUserFormLink" href="/signup">Don&apos;t have an account? Sign up</a>
                </div>
            </div>
        </main>
    </>);
}
