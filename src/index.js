import React, {StrictMode} from 'react'
import './index.css'
import App from './App'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {AuthenticationProvider} from './context/AuthenticationProvider'
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

disableReactDevTools()

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10000,
            retry: false
        },
    },
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthenticationProvider>
                    <Routes>
                        <Route path='/*' element={<App/>}/>
                    </Routes>
                </AuthenticationProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>)