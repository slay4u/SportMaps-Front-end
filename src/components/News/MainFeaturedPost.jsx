import React from 'react'
import {useNavigate} from 'react-router-dom'
import './News.css'

export default function MainFeaturedPost(prop) {
  const {post} = prop
  const date =
    new Date(post?.date).toLocaleDateString('uk-UA') + " " +
    new Date(post?.date).toLocaleTimeString('uk-UA').slice(0, 5)
  const text = (post?.text.length > 330) ? post?.text.slice(0,330) + '...' : post?.text
  const navigate = useNavigate()

  return <div
        className='main-featured-container'
        onClick={() => navigate(`/news/${post.id}`)}
        style={{backgroundImage: `url(https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1082&q=80)`}}
      >
        <span className='main-featured-container-shadow'></span>
        <div className='main-featured-content'>
          <h1>{post?.name}</h1>
          <p>{date}</p>
          <p>{text}</p>
        </div>
      </div>
}
