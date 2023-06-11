import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

export default function FeaturedTopic(prop) {
  const { topic } = prop;
  const createDate =
    new Date(topic.createDate).toLocaleDateString("uk-UA") +
    " " +
    new Date(topic.createDate).toLocaleTimeString("uk-UA").slice(0, 5);
  const description =
    topic.desc.length > 100 ? topic.desc.slice(0, 100) + "..." : topic.desc;
  const nav = useNavigate();

  const navigate = () => {
    nav(`/forumPage/${topic.id}`);
  };

  return (
    <>
      <Grid item xs={1}>
        <CardActionArea onClick={navigate}>
          <Card
            sx={{
              display: "flex",
              backgroundColor: "rgb(235, 228, 228)",
              height: "10em",
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {topic.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" paragraph>
                {createDate}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {description}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </>
  );
}
