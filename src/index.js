import React, {StrictMode} from 'react'
import './index.css'
import App from './App'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {StateContextProvider} from './context/context'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <StateContextProvider>
                    <App/>
                </StateContextProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>)