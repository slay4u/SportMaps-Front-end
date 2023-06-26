import React, {useEffect, useState} from "react";
import {useGetUserProfileDataMutation} from "../../store/auth/authApiSlice";
import "./user.css";

export default function UserProfile() {
    const [userDataCall] = useGetUserProfileDataMutation();
    let avatarElement = null;
    let avatarText = null;
    const [userData, setUserData] = useState({});
    let flag = false;
    const colors = [
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
        userDataCall().then((res) => {
            setUserData(res.data);
            avatarElement = document.getElementById("userProfileAvatar");
            createUserAvatar(res.data);
        });
    }, []);

    function createUserAvatar(user) {
        if (!flag) {
            avatarText = document.createTextNode(user.user.firstName[0]);
            avatarElement.appendChild(avatarText);
            avatarElement.style["background-color"] = getAvatarColor(
                user.user.firstName + user.user.lastName
            );
            flag = true;
        }
    }

    function getAvatarColor(userProfAv) {
        let hash = 0;
        for (let i = 0; i < userProfAv.length; i++) {
            hash = 31 * hash + userProfAv.charCodeAt(i);
        }
        const index = Math.abs(hash % colors.length);
        return colors[index];
    }

    return (
        <>
            <main id="userProfileMainPage">
                <div id="userProfileMainBackground"><p>.</p></div>
                <div id="userProfileMainContainer">
                    <button id="userProfileSaveButton">Save</button>
                    <div id="userProfileName">
                        <i id="userProfileAvatar"></i>
                        <h1>
                            {userData.user && userData.user.firstName}{" "}
                            {userData.user && userData.user.lastName}
                        </h1>
                        <p>Here you can update your personal details.</p>
                    </div>
                    <div id="userProfileUsername">
                        <h2>Username:</h2>
                        <h3>
                            {userData.user && userData.user.firstName.toLowerCase()}
                            {userData.user && userData.user.lastName.toLowerCase()}
                        </h3>
                    </div>
                    <div id="userProfileJoinedOn">
                        <h2>Joined on:</h2>
                        <h3>
                            {userData.user
                                && new Date(userData.user.createdAt).toLocaleDateString(
                                    "uk-UA"
                                ) +
                                " " +
                                new Date(userData.user.createdAt)
                                    .toLocaleTimeString("uk-UA")
                                    .slice(0, 5)}
                        </h3>
                    </div>
                    <div id="userProfileBio">
                        <h2>Your bio:</h2>
                        <textarea></textarea>
                    </div>
                    <div id="userProfileEmail">
                        <h2>Email:</h2>
                        <h3>{userData.user && userData.user.email}</h3>
                    </div>
                </div>
            </main>
        </>
    );
}
