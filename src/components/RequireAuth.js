import {Navigate, Outlet, useLocation} from 'react-router-dom'
import React from 'react'
import useAuthentication from '../hooks/useAuthentication'

export default function RequireAuth({allowedRoles}) {
    const location = useLocation()
    const {state} = useAuthentication()
    return allowedRoles?.includes(state?.role) ? <Outlet/> : state?.token ?
        <Navigate to='/unauthorized' state={{from: location}} replace/> :
        <Navigate to='/login' state={{from: location}} replace/>
}
