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
  const routeChange = () => {
    navigate(`/newsPage/${post.id}`);
  };

  return (
    <>
      <div 
        className="featured-container"
        onClick={routeChange}
      >
        <div 
          className="featured-content"
        >
          <h1>{post.name}</h1>
          <h2>{publishDate}</h2>
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
