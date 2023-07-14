import React from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import "./forums.css";

export default function FeaturedTopic(prop: PropTypes.InferProps<typeof FeaturedTopic.propTypes>) {
    const {topic} = prop;
    const createDate = new Date(topic.createDate).toLocaleDateString("uk-UA") + " " + new Date(topic.createDate).toLocaleTimeString("uk-UA").slice(0, 5);
    const description = topic.desc.length > 100 ? topic.desc.slice(0, 100) + "..." : topic.desc;
    const navigate = useNavigate();

    return (<>
        <div className="featured-container" onClick={() => navigate(`/forumPage/${topic.id}`)}>
            <div className="featured-content">
                <h4>{topic.name}</h4>
                <h5>{createDate}</h5>
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
