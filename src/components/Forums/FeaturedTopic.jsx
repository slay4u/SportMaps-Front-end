import React from 'react'
import {useNavigate} from 'react-router-dom'
import './forums.css'

export default function FeaturedTopic(prop) {
    const {topic} = prop
    const date = new Date(topic.date).toLocaleDateString("uk-UA") + " " + new Date(topic.date).toLocaleTimeString("uk-UA").slice(0, 5)
    const text = topic.text.length > 100 ? topic.text.slice(0, 100) + "..." : topic.text
    const navigate = useNavigate()

    return <div className="featured-container" onClick={() => navigate(`/forums/${topic.id}`)}>
        <div className="featured-content">
            <h4>{topic.name}</h4>
            <h5>{date}</h5>
            <p>{text}</p>
        </div>
    </div>
}
