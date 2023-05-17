import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoMatch() {
    const navigate = useNavigate();
    React.useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }, [navigate])
    return (
        <Box bgcolor={'#4682b4'} sx={{ height: '100vh' }}>
            <Typography paddingTop={35} variant='h1' textAlign={'center'} fontSize={160} letterSpacing={13} color={'#00ff7f'}>
                4 0 4
            </Typography>
            <Typography textAlign={'center'} variant='h4' fontFamily={'cursive'} color={'#ff00ff'}>
                You didn't break the internet, but we can't find what you're looking for.
            </Typography>
            <Typography textAlign={'center'} variant='h4' fontFamily={'cursive'} color={'#ff7f50'}>
                Redirecting to home page...
            </Typography>
        </Box>
    );
}