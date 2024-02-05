import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function NoMatch() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => navigate(-1),
            2000)
    }, [])

    return <main className="center-container">
        <div className="noMatchContainer">
            <h1>4 0 4</h1>
            <h4>You did{''}n&apos;t break the internet, but we can&apos;t find what
                you&apos;re looking for.</h4>
            <h4>Redirecting to home page...</h4>
        </div>
    </main>
}
