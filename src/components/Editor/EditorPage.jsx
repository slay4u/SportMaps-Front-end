import './EditorPage.css'
import 'react-quill/dist/quill.snow.css'
import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import useAuthentication from '../../hooks/useAuthentication'
import {jwtDecode} from 'jwt-decode'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createMultipartFn, updateMultipartFn} from '../../api/authApi'
import {useLocation, useNavigate, useParams} from 'react-router-dom'

export default function EditorPage() {
    const {id} = useParams()
    const {state} = useAuthentication()
    const prevNews = useLocation().state

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const [title, setTitle] = useState(prevNews?.name || '')
    const [text, setText] = useState(prevNews?.text || '')
    const [file, setFile] = useState(null)

    const queryClient = useQueryClient()
    const createNews = useMutation({
        mutationFn: (formData) => createMultipartFn('/news', formData),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news']})
    })
    const editNews = useMutation({
        mutationFn: (formData) => updateMultipartFn('/news', id, formData),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news', id]})
    })

    function createNewsFn() {
        let formData = new FormData()
        formData.append('news', new Blob([JSON.stringify({
            name: title.trim(),
            date: new Date(Date.now() - ((new Date().getTimezoneOffset()) * 60000)).toJSON().slice(0, 16),
            text: text,
            author: jwtDecode(state?.token)?.sub})], {type: 'application/json'}))
        formData.append('image', file)
        createNews.mutate(formData)
        navigate(from, {replace: true})
    }

    function updateNewsFn() {
        let formData = new FormData();
        formData.append('news', new Blob([JSON.stringify({
            name: title.trim(),
            date: new Date(Date.now() - ((new Date().getTimezoneOffset()) * 60000)).toJSON().slice(0, 16),
            text: text,
            author: prevNews?.author.split('|')[0]})], {type: 'application/json'}))
        formData.append('image', file)
        editNews.mutate(formData)
        navigate(-1)
    }

    const modules = {
        toolbar: [
            [{'header': [1, 2, 3, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link', 'image'],

            [{'indent': '-1'}, {'indent': '+1'}],
            // [{'color': []}, {'background': []}],
            // [{'font': []}],
            // [{'align': []}],

            ['clean']
        ],
    }

    return <main className='write'>
        <div className='content'>
            <input type='text' placeholder='Title' name='name' value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
            <div className='editorContainer'>
                <ReactQuill className='editor' theme='snow' modules={modules} value={text} onChange={setText}/>
            </div>
        </div>

        <div className='menu'>
            <div className='item'>
                <h3>Publish</h3>
                <span>
                    <b>Author: </b> {jwtDecode(state?.token)?.sub} <br/>
                </span>
                <input style={{display: 'none'}} type='file' id='file' name='' onChange={(e) => setFile(e.target.files[0])}/>
                <label className='file' htmlFor='file'>Upload Image</label>
                {id ? (<div className='buttons'>
                    <button type='submit' onClick={updateNewsFn} style={{marginTop: '15px'}}>Update</button>
                </div>) : (<div className='buttons'>
                    <button type='submit' onClick={createNewsFn} style={{marginTop: '15px'}}>Save</button>
                </div>)}
            </div>
        </div>
    </main>
}