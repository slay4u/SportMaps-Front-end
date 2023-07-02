import React, {useEffect, useState} from "react";
import {LockPersonOutlined} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {useSignupMutation} from "../../store/auth/authApiSlice";

const USERNAME_REGEX = "^(?=.{2,30}$)[A-Z][a-zA-Z]*(?:\\h+[A-Z][a-zA-Z]*)*$";
const PWD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[{}:#@!;\\[_'`\\],\".\\/~?*\\-$^+=\\\\<>]).{8,20}$";
const EMAIL_REGEX = "^(?=.{1,32}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

export default function SignUp() {
    const [signup] = useSignupMutation();
    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setValidFirstName(checkValid(firstName, USERNAME_REGEX));
    }, [firstName]);

    useEffect(() => {
        setValidLastName(checkValid(lastName, USERNAME_REGEX));
    }, [lastName]);

    useEffect(() => {
        setValidEmail(checkValid(email, EMAIL_REGEX));
    }, [email]);

    useEffect(() => {
        setValidPassword(checkValid(password, PWD_REGEX));
    }, [password]);

    useEffect(() => {
        setErrMsg("Something went wrong.");
    }, [firstName, lastName, email, password]);

    const checkValid = (checkedString: string, regex: string) => {
        return !!checkedString.match(regex);
    };

    const activateAccount = async (token: string) => {
        const response = await fetch(`http://localhost:8090/sport-maps/v1/auth/accountVerification/${token}`, {
            method: "GET",
        });
        if (response.ok) {
            navigate("/signin");
            window.location.reload();
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!firstName.match(USERNAME_REGEX) || !lastName.match(USERNAME_REGEX) || !email.match(EMAIL_REGEX) || !password.match(PWD_REGEX)) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await signup({
                firstName, lastName, email, password
            }).unwrap();
            setFirstName("");
            setLastName("");
            setPassword("");
            setEmail("");
            await activateAccount(response);
        } catch (err) {
            alert(errMsg);
        }
    };

    return (<>
        <main className="signUserFormBackground">
            <div className="signUserFormContainer">
                <div className="signUserFormAvatar">
                    <LockPersonOutlined sx={{fontSize: "2.5rem"}}/>
                </div>
                <p>Sign Up</p>
                <div className="sign-input-container">
                    <input
                        required
                        type="text"
                        autoComplete="off"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>First Name</label>
                    <h1 className={firstName && !validFirstName ? "instructions" : "offscreen"}>
                        Provide valid name, please.
                    </h1>
                </div>
                <div className="sign-input-container">
                    <input
                        required
                        type="text"
                        autoComplete="off"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label>Last Name</label>
                    <h1 className={lastName && !validLastName ? "instructions" : "offscreen"}>
                        Provide valid name, please.
                    </h1>
                </div>
                <div className="sign-input-container">
                    <input
                        required
                        type="text"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email</label>
                    <h1 className={email && !validEmail ? "instructions" : "offscreen"}>
                        Provide valid email, please.
                    </h1>
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
                    <h1 className={password && !validPassword ? "instructions" : "offscreen"}>
                        Password must contain letters, numbers and special symbols. Should be at least 8 characters
                        long.
                    </h1>
                </div>
                <button
                    type="submit"
                    className="signUserFormButton"
                    disabled={!validFirstName || !validLastName || !validEmail || !validPassword}
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
                <div className="signUserFormLinkContainer">
                    <Link className="signUserFormLink" to="/signin" reloadDocument>
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </main>
    </>);
}
