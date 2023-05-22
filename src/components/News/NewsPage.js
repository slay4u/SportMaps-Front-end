import * as React from 'react';
import Box from '@mui/material/Box';
import { Avatar, Button, Container, Divider, Typography } from '@mui/material';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

export default function NewsPage() {
    return (
        <>
            <Box sx={{bgcolor: 'rgb(211,211,211)'}}>
                <Container maxWidth="xl" sx={{pt: '5%'}}>
                    <main>
                        <Box sx={{display: 'flex', border: '1px solid green'}}>
                            <Typography variant='h3'
                                sx={{pl: '5%', mb: '1%', width: '60%', fontWeight: 'bold', border: '1px solid red'}}
                            >
                                Postcard from Hudson Valley - my trip to upstate New York in photos
                            </Typography>
                            <Button 
                                sx={{width: '7%', height: '5%', borderRadius: 4.5, bgcolor: 'black', color: 'white', 
                                    fontWeight: 'bold', textTransform: 'capitalize', fontSize: '16px', ml: '27.5%', mt: '1%',
                                    transition: 'all 0.3s',
                                    ':hover': {
                                        bgcolor: 'rgb(0, 102, 204)',
                                        transform: 'scale(1.04)'
                                    }
                                }}
                                onClick={() => {alert("Clicked");}}
                            >
                                Save 
                                <Typography sx={{ml: '5%', display: 'flex', alignContent: 'center'}}>
                                    <TurnedInNotIcon fontSize='small'/>
                                </Typography>
                            </Button>
                        </Box>
                        <Box
                            sx={{display: 'flex', pl: '5%'}}
                        >
                            <Avatar src="https://source.unsplash.com/random/?avatar/" alt="author"></Avatar>
                            <Box
                                sx={{ml: '5%', border: '1px solid white'}}
                            >
                                <Typography>r</Typography>
                                <Divider/>
                                <Typography>r</Typography>
                            </Box>
                        </Box>
                        <img src="https://source.unsplash.com/random/?sport/" alt="sport-img"
                            style={{objectFit: 'cover', width: '100%', height: '800px'}}>
                        </img>
                    </main>
                </Container>
            </Box>       
        </>
    );
}