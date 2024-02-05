import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Unauthorized() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => navigate(-1),
            2000)
    }, [])

    return <main>
        <p>401 Unauthorized</p>
    </main>
}
