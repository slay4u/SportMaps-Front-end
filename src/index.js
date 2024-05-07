import React, {StrictMode} from 'react'
import './index.css'
import App from './App'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {AuthenticationProvider} from './context/AuthenticationProvider'

createRoot(document.getElementById('root')).render(
    <StrictMode>
            <BrowserRouter>
                <AuthenticationProvider>
                    <Routes>
                        <Route path='/*' element={<App/>}/>
                    </Routes>
                </AuthenticationProvider>
            </BrowserRouter>
    </StrictMode>)