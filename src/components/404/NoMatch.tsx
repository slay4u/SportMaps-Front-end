import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./nomatch.css";

export default function NoMatch() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 2000);
    }, [navigate]);
    return (<>
        <div id="noMatchContainer">
            <p id="noMatchElement1">
                4 0 4
            </p>
            <p id="noMatchElement2">
                You did{""}n&apos;t break the internet, but we can&apos;t find what
                you&apos;re looking for.
            </p>
            <p id="noMatchElement3">
                Redirecting to home page...
            </p>
        </div>
    </>);
}
