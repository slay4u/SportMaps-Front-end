import React from "react";
import {useNavigate} from "react-router-dom";

export default function FeaturedTopic(prop) {
    const {topic} = prop;
    const createDate = new Date(topic.createDate).toLocaleDateString("uk-UA") +
        " " + new Date(topic.createDate).toLocaleTimeString("uk-UA").slice(0, 5);
    const description = topic.desc.length > 100 ? topic.desc.slice(0, 100) + "..." : topic.desc;
    const nav = useNavigate();

    const navigate = () => {
        nav(`/forumPage/${topic.id}`);
    };

    return (<>
        <div
            className="featured-container"
            onClick={navigate}
        >
            <div
                className="featured-content"
            >
                <h1>{topic.name}</h1>
                <h2>{createDate}</h2>
                <p>{description}</p>
            </div>
        </div>
    </>);
}
