import './News.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random/?sport/4',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};
  
const featuredPosts = [
  {
    type: 'Chess boxing',
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?sport/5',
    imageLabel: 'Image Text',
  },
  {
    type: 'Workout',
    title: 'Featured post',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?sport/6',
    imageLabel: 'Image Text',
  },
  {
    type: 'Box',
    title: 'Featured post',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?sport/7',
    imageLabel: 'Image Text',
  },
];

const theme = createTheme();

export default function News() {

  let navigate = useNavigate(); 
  const routeChange = () => { 
    let path = '/NewsPage'; 
    navigate(path);
  }

  return (
      <Box sx={{backgroundColor: 'rgb(211,211,211)'}}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container
            maxWidth="none"
            disableGutters
            sx={{display: 'table', tableLayout: 'fixed'}}
          >
            <Box 
              className='main-box' 
              onClick={routeChange}
            >
              <img src="https://source.unsplash.com/random/?sport/1" alt="new-img1"
                className='main-box-img'
              ></img>
              <ArrowForwardIcon fontSize='large'  
                className='main-box-arrow'
              />
              <Typography
                sx={{fontSize: '32px'}}
                className='main-box-text'
              >
                The top 10 hiking trails in Maine
              </Typography>
            </Box>
            <Box 
              className='main-box' 
              onClick={() => {alert('Clicked');}}
            >
              <img src="https://source.unsplash.com/random/?sport/2" alt="new-img1"
                className='main-box-img'
              ></img>
              <ArrowForwardIcon fontSize='large'  
                className='main-box-arrow'
              />
              <Typography
                sx={{fontSize: '32px'}}
                className='main-box-text'
              >
                The top 10 hiking trails in Maine
              </Typography>
            </Box>
            <Box 
              className='main-box' 
              onClick={() => {alert('Clicked');}}
            >
              <img src="https://source.unsplash.com/random/?sport/3" alt="new-img1"
                className='main-box-img'
              ></img>
              <ArrowForwardIcon fontSize='large'  
                className='main-box-arrow'
              />
              <Typography
                sx={{fontSize: '32px'}}
                className='main-box-text'
              >
                The top 10 hiking trails in Maine
              </Typography>
            </Box>
          </Container>
          <Container maxWidth="lg" sx={{mt: '64px'}}>
            <main style={{paddingBottom: '1%'}}>
              <MainFeaturedPost post={mainFeaturedPost}/>
              <Grid container spacing={3} columns={1}>
                {featuredPosts.map((post) => (
                  <FeaturedPost key={post.title} post={post} />
                ))}
              </Grid>
            </main>
          </Container>
        </ThemeProvider>
      </Box>
  );
}