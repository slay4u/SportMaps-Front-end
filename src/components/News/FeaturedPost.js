import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';

function FeaturedPost(prop) {
  const { post } = prop;
  const publishDate = new Date(post.publishDate).toLocaleDateString('uk-UA') + " " + new Date(post.publishDate).toLocaleTimeString('uk-UA').slice(0,5);
  const description = (post.desc.length > 330) ? post.desc.slice(0,330) + "..." : post.desc;

  let navigate = useNavigate(); 
  const routeChange = () => { 
    let path = `/newsPage/${post.id}`;
    navigate(path);
  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea onClick={routeChange}>
        <Card sx={{ display: 'flex', backgroundColor: 'rgb(192,192,192)', height: '200px'}}>
          <CardContent sx={{ flex: 1 }}>
             <Typography component="h2" variant="h5">
              {post.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              {publishDate}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {description}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: '25%', height: '100%', display: { xs: 'none', sm: 'block' }, objectPosition: "50% 30%" }}
            image={"https://source.unsplash.com/random/?sport" + "/" + post.id}
            // image={post.image}
            alt={post.id + " image"}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;