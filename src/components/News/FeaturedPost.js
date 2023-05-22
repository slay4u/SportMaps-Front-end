import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function FeaturedPost(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex', backgroundColor: 'rgb(192,192,192)', height: '200px'}}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6" color="text.secondary">
              {post.type}
            </Typography>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            {/* <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography> */}
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: '25%', height: '100%', display: { xs: 'none', sm: 'block' }, objectPosition: "50% 30%" }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;