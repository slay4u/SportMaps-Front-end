import React, {useEffect} from 'react'

export default function NoMatch() {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/'
        }, 2000)
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
