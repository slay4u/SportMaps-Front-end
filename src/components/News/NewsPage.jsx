import React, {useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import NewsComment from './NewsComment'
import './News.css'
import useAuthentication from '../../hooks/useAuthentication'
import {createFn, deleteFn, getByIdFn} from '../../api/authApi'
import {CircularProgress} from '@mui/material'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

export default function NewsPage() {
    const {id} = useParams()
    const {state} = useAuthentication()
    const [comment, setComment] = useState({
        text: '', id: id, author: jwtDecode(state?.token)?.sub, date: ''
    })

    const {data, isLoading} = useQuery({
        queryKey: ['news', id], queryFn: () => getByIdFn('/news', id)
    })
    const queryClient = useQueryClient()
    const deleteNews = useMutation({
        mutationFn: () => deleteFn('/news', id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news']})
    })
    const createComment = useMutation({
        mutationFn: (body) => createFn('/news-comments', body),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news-comments']})
    })

    const newsDate = useDate(data?.date)

    function updateComment(e) {
        setComment({...comment, text: e.target.value})
    }

    function submitComment() {
        comment.date = new Date(Date.now() - ((new Date().getTimezoneOffset()) * 60000)).toJSON().slice(0, 16)
        createComment.mutate(comment)
        window.location.reload()
    }

    function deleteNewsFn() {
        deleteNews.mutate()
        window.location.href = '/'
    }

    return <main>
        {isLoading ? <CircularProgress/> : <>
            <img
                className='news-page-img'
                src={`data:image/jpeg;base64, ${data?.image}`}
                alt='sport-img'
                loading='lazy'
            />
            <div className='news-page-title-section'>
                <h3>{data?.name}</h3>
                {jwtDecode(state?.token)?.role === 'ADMIN' ? (<>
                    <button className='admin-btn edit-btn'>
                        <Link to={`/editor/${id}`} state={data}
                              style={{color: 'black', textDecoration: 'none'}}>Редагувати</Link>
                    </button>
                    <button className='admin-btn delete-btn'
                            onClick={deleteNewsFn}>
                        Видалити
                    </button>
                </>) : null}
            </div>
            <div className='news-page-author-section'>
                <img
                    id='news-page-author-avatar'
                    src='https://source.unsplash.com/random/?sport/'
                    alt='author-avatar'
                ></img>
                <div className='news-page-author-info'>
                    <p>{data?.author.split('|')[1] + " " + data?.author.split('|')[2]}</p>
                    <p>{newsDate}</p>
                </div>
            </div>
            <hr id='news-page-divider'/>
            <div>{parse(DOMPurify.sanitize(data?.text))}</div>
            <hr id='news-page-divider'/>

            <h4>Коментарі</h4>
            <textarea
                className='comment-area'
                onChange={updateComment}
            ></textarea>
            <button className='send-btn'
                    type='submit'
                    onClick={submitComment}>
                Надіслати
            </button>
            <div className='template-grid'>
                {data?.comments.map((comment) => (<NewsComment key={comment.id} comment={comment}/>))}
            </div>
        </>}
    </main>
}
