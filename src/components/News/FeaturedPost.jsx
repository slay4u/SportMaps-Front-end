import React from 'react'
import {useNavigate} from 'react-router-dom'
import './News.css'

export default function FeaturedPost(prop) {
  const {post} = prop
  const date =
    new Date(post.date).toLocaleDateString('uk-UA') +
    " " +
    new Date(post.date).toLocaleTimeString('uk-UA').slice(0, 5)
  const text = post.text.length > 330 ? post.text.slice(0, 330) + '...' : post.text
  const navigate = useNavigate()

  return <div
        className="featured-container"
        onClick={() => navigate(`/news/${post.id}`)}
      >
        <div 
          className="featured-content"
        >
          <h4>{post.name}</h4>
          <h5>{date}</h5>
          <p>{text}</p>
        </div>
        <img 
          className="featured-image"
          src={"https://source.unsplash.com/random/?sport" + "/" + post.id} 
          alt={post.id + " image"}
        ></img>
      </div>
}
