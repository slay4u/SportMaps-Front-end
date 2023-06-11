import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

function MainFeaturedPost(prop) {
  const { post } = prop;
  const description = (post.desc.length > 330) ? post.desc.slice(0,330) + "..." : post.desc;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${"https://source.unsplash.com/random/?sport" + "/" + post.id})`,
        // backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={"https://source.unsplash.com/random/?sport" + "/" + post.id} alt={post.id + " image"} />}
      {/* {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />} */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.5)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.name}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {description}
            </Typography>
            {/* <NavLink to="/" reloadDocument variant="subtitle1" */}
            <NavLink to={`/newsPage/${post.id}`} reloadDocument variant="subtitle1"
              style={({ isActive }) =>
              isActive
                  ? { color: 'white', fontSize: '20px'}
                  : { color: 'white', fontSize: '20px'}
              }
            >
              {"Continue reading…"}
            </NavLink>
            {/* <Link variant="subtitle1" href="#">
              {post.linkText}
            </Link> */}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

// MainFeaturedPost.propTypes = {
//   post: PropTypes.shape({
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageText: PropTypes.string.isRequired,
//     linkText: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default MainFeaturedPost;