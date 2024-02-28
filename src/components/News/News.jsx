import './News.css'
import React from 'react'
import MainFeaturedPost from './MainFeaturedPost'
import FeaturedPost from './FeaturedPost'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import useAuthentication from '../../hooks/useAuthentication'
import {getAllFn} from '../../api/authApi'
import {useQuery} from '@tanstack/react-query'
import {CircularProgress} from '@mui/material'
import {useLocation, useNavigate} from 'react-router-dom'

export default function News() {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/editor'

    const {state} = useAuthentication()
    const {data, isLoading} = useQuery({
        queryKey: ['news'], queryFn: () => getAllFn('/news', 0)
    })

    return <main>
        <div className='news-img-container'>
            <div className='news-img-item'>
                <img
                    className='news-img'
                    src='https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80'
                    alt='first image'
                ></img>
                <span className='news-img-arrow'>
                            <ArrowForwardIcon sx={{fontSize: '4rem'}}/>
                        </span>
                <p className='news-img-text'>
                    The top 10 hiking trails in Maine
                </p>
            </div>
            <div className='news-img-item'>
                <img
                    className='news-img'
                    src='https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'
                    alt='first image'
                ></img>
                <span className='news-img-arrow'>
                            <ArrowForwardIcon sx={{fontSize: '4rem'}}/>
                        </span>
                <p className='news-img-text'>
                    The top 10 hiking trails in Maine
                </p>
            </div>
            <div className='news-img-item'>
                <img
                    className='news-img'
                    src='https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
                    alt='first image'
                ></img>
                <span className='news-img-arrow'>
                            <ArrowForwardIcon sx={{fontSize: '4rem'}}/>
                        </span>
                <p className='news-img-text'>
                    The top 10 hiking trails in Maine
                </p>
            </div>
        </div>

        {state?.role === 'ADMIN' ? <div className='create-btn-container'>
            <button className='admin-btn create-btn'
                    onClick={() => navigate(from)}>
                Створити новину
            </button>
        </div> : null}

        {isLoading ? <CircularProgress/> : <>
            {data?.content?.slice(0, 1).map(post => (<MainFeaturedPost key={post.id} post={post}/>))}
            <div className='template-grid'>
                {data?.content?.slice(1).map(post => (<FeaturedPost key={post.id} post={post}/>)).reverse()}
            </div>
        </>}
    </main>
}
