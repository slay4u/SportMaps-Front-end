import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {verifyFn} from '../../api/api'
import {CircularProgress} from '@mui/material'

export default function VerificationPage() {
    const {id} = useParams()
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async function(){
            try {
                await verifyFn(id)
                setIsError(false)
            } catch (err) {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    return <main className=''>
        {isLoading ? <CircularProgress/> : <section className=''>
            {isError ? <p className=''>Verification link expired or doesn't exist.</p>
                : <p className=''>Email verified. You can now sign in.</p>}
        </section>}
    </main>
}
