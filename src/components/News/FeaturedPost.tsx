import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./News.css";

export default function FeaturedPost(prop: PropTypes.InferProps<typeof FeaturedPost.propTypes>) {
  const { post } = prop;
  const publishDate =
    new Date(post.publishDate).toLocaleDateString("uk-UA") +
    " " +
    new Date(post.publishDate).toLocaleTimeString("uk-UA").slice(0, 5);
  const description = post.desc.length > 330 ? post.desc.slice(0, 330) + "..." : post.desc;
  const navigate = useNavigate();

  return (
    <>
      <div 
        className="featured-container"
        onClick={() => navigate(`/newsPage/${post.id}`)}
      >
        <div 
          className="featured-content"
        >
          <h4>{post.name}</h4>
          <h5>{publishDate}</h5>
          <p>{description}</p>
        </div>
        <img 
          className="featured-image"
          src={"https://source.unsplash.com/random/?sport" + "/" + post.id} 
          alt={post.id + " image"}
        ></img>
      </div>
    </>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};
