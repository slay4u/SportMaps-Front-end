import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import "./News.css";

export default function MainFeaturedPost(prop: PropTypes.InferProps<typeof MainFeaturedPost.propTypes>) {
  const { post } = prop;
  const publishDate =
    new Date(post.publishDate).toLocaleDateString("uk-UA") +
    " " +
    new Date(post.publishDate).toLocaleTimeString("uk-UA").slice(0, 5);
  const description = (post.desc.length > 330) ? post.desc.slice(0,330) + "..." : post.desc;

  const navigate = useNavigate();
  const routeChange = () => {
    navigate(`/newsPage/${post.id}`);
  };

  return (
    <>
      <div 
        className='main-featured-container'
        onClick={routeChange}
        style={{backgroundImage: `url(${"https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1082&q=80"})`}}
      >
        <span className='main-featured-container-shadow'></span>
        <div className='main-featured-content'>
          <h1>{post.name}</h1>
          <p>{publishDate}</p>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
  }).isRequired
};
