import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MainFeaturedPost(prop: PropTypes.InferProps<typeof MainFeaturedPost.propTypes>) {
  const { post } = prop;
  const description = (post.desc.length > 330) ? post.desc.slice(0,330) + "..." : post.desc;

  return (
    <>
      <div 
        className='main-featured-container'
        style={{backgroundImage: `url(${"https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1082&q=80"})`}}
      >
        <span className='main-featured-container-shadow'></span>
        <div className='main-featured-content'>
          <h1>{post.name}</h1>
          <p>{description}</p>
          <Link
            id="main-featured-link"
            to={`/newsPage/${post.id}`}
            reloadDocument
          >
            Continue reading…
          </Link>
        </div>
      </div>
    </>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
  }).isRequired
};

export default MainFeaturedPost;