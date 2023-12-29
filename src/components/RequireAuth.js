import {Navigate, Outlet, useLocation} from 'react-router-dom'
import React from 'react'
import {useAuthentication} from '../context/context'

export default function RequireAuth() {
    const location = useLocation()
    const {state} = useAuthentication()
    if (!state.token || state.token.length < 32)
        return <Navigate to="/login" state={{from: location}} replace/>
    return <Outlet/>
}
