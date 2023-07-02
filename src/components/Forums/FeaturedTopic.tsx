import React from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

export default function FeaturedTopic(prop: PropTypes.InferProps<typeof FeaturedTopic.propTypes>) {
    const {topic} = prop;
    const createDate = new Date(topic.createDate).toLocaleDateString("uk-UA") + " " + new Date(topic.createDate).toLocaleTimeString("uk-UA").slice(0, 5);
    const description = topic.desc.length > 100 ? topic.desc.slice(0, 100) + "..." : topic.desc;
    const navigate = useNavigate();

    const routeChange = () => {
        navigate(`/forumPage/${topic.id}`);
    };

    return (<>
        <div
            className="featured-container"
            onClick={routeChange}
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

FeaturedTopic.propTypes = {
    topic: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        createDate: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
    }).isRequired,
};
