import {Navigate, Outlet, useLocation} from 'react-router-dom'
import React from 'react'
import {useStateContext} from '../context/context'

export default function RequireAuth() {
    const location = useLocation()
    const { state } = useStateContext()
    return state.token ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>
}
