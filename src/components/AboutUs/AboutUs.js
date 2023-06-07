import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function AboutUs() {
  const [email, setEmail] = React.useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Container
        maxWidth="false"
        disableGutters
        sx={{ width: "100%", position: "relative" }}
      >
        <img
          src="https://source.unsplash.com/random/?gym"
          alt="sport"
          width="100%"
          height="530"
          style={{
            objectFit: "cover",
            filter: "blur(3px) contrast(70%) brightness(75%)",
          }}
        ></img>
        <Typography
          component="div"
          align="center"
          sx={{
            flexGrow: 1,
            color: "white",
            position: "absolute",
            top: "36%",
            left: "43%",
            fontSize: 20,
          }}
        >
          <span style={{ fontSize: 68, fontWeight: "bold" }}>About Us</span>
          <br></br>
          For sport-lovers everywhere.
        </Typography>
      </Container>
      <Typography
        sx={{
          fontSize: 18,
          fontFamily: "fangsong",
          fontWeight: "medium",
          color: "DarkSlateGray",
          ml: "35%",
          mr: "31%",
          mt: "4%",
          mb: "4%",
        }}
      >
        We believe that sport is for everyone. It helps us learn about our body
        and people around us.<br></br>
        <br></br>
        Our goal is to help more people from more backgrounds experience the joy
        of sportsmanship. Because we believe this builds a kinder, more
        inclusive, more open-minded world.<br></br>
        <br></br>
        Like you, sport is in our DNA. At Sport Maps, we believe exercise opens
        the door to the greatest, most unforgettable experiences life can offer.
        And we have learned that the best training is about putting yourself out
        there, about leaving behind the everyday, about immersing yourself,
        rather than just seeing YouTube videos.<br></br>
        <br></br>
        As athletes, you&apos;re on an amazing path, and at Sport Maps, we&apos;re on one,
        too. Over the last decade, exercising has transformed. We&apos;re thinking
        deeply not just about how we train but why we do it and how to best
        serve sport-lovers on their path - and we approach our 1st year with a
        passion and commitment to helping others do it, too.
      </Typography>
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          height: "12%",
          position: "relative",
          backgroundColor: "#4169E1",
          padding: "4%",
        }}
      >
        <Paper sx={{ padding: "3%", ml: "6%", mr: "6%", borderRadius: 5 }}>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: 28,
              fontWeight: "bold",
              color: "#4169E1",
              fontFamily: "fangsong",
            }}
          >
            Subscribe & Get 10% off
          </Typography>
          <Box
            sx={{ display: "flex" }}
            Validate
            component="form"
            onSubmit={handleSubmit}
          >
            <Typography
              sx={{
                fontFamily: "fangsong",
                color: "DarkSlateGray",
                fontSize: 18,
                fontWeight: "medium",
                width: "43%",
              }}
            >
              Join our newsletter and discover new sport events to inspire the
              athlete within. Plus, get 10% off at your trainings. Every week
              you&apos;ll receive expert advice, tips, exclusive offers, and much
              more.
            </Typography>
            <TextField
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ borderRadius: 5, width: "28%", ml: "17%" }}
            />
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: 5,
                width: "7%",
                height: "",
                ml: "2%",
                mt: "0.5%",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
      <Typography
        sx={{
          textAlign: "left",
          fontSize: 48,
          fontWeight: "bold",
          mt: "4%",
          ml: "10%",
          mb: "4%",
          fontFamily: "fangsong",
        }}
      >
        At Sport Maps, our core<br></br>
        values guide our evolution:<br></br>
      </Typography>
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "12%",
          mb: "4%",
        }}
      >
        <Typography
          sx={{
            alignItems: "center",
            display: "flex",
            fontFamily: "fangsong",
            width: "20%",
            ml: "15%",
            padding: "1%",
            fontSize: 18,
            color: "DarkSlateGray",
            backgroundColor: "#F0F8FF",
            borderRadius: 5,
            justifyContent: "center",
          }}
        >
          We pursue a vision of the world in which all are welcome. We believe
          sport can help foster the connection and understanding that makes
          meaningful moments possible.
        </Typography>
        <Typography
          sx={{
            alignItems: "center",
            display: "flex",
            fontFamily: "fangsong",
            width: "20%",
            padding: "1%",
            fontSize: 18,
            color: "DarkSlateGray",
            backgroundColor: "#F0F8FF",
            borderRadius: 5,
            justifyContent: "center",
          }}
        >
          We think everyone deserves to experience the joy of sport. Whatever
          your background or needs and no matter what you want to train: we are
          here to empower your exercise.
        </Typography>
        <Typography
          sx={{
            alignItems: "center",
            display: "flex",
            fontFamily: "fangsong",
            width: "20%",
            mr: "15%",
            padding: "1%",
            fontSize: 18,
            color: "DarkSlateGray",
            backgroundColor: "#F0F8FF",
            borderRadius: 5,
            justifyContent: "center",
          }}
        >
          We know sport has injury, expense and snobbery consequences. We must
          equip athletes with the knowledge to make informed choices about their
          sportsmanship, and inspire them to exercise with wisdom.
        </Typography>
      </Container>
      <Box sx={{ position: "relative", width: "100%" }}>
        <img
          src="https://source.unsplash.com/random/?hiking"
          alt="sport"
          width="100%"
          height="450"
          style={{
            objectFit: "cover",
            filter: "blur(3px) contrast(70%) brightness(75%)",
          }}
        ></img>
        <Typography
          component="div"
          align="center"
          sx={{
            alignItems: "center",
            fontFamily: "fangsong",
            fontSize: 22,
            position: "absolute",
            color: "white",
            top: "30%",
            left: "33%",
            right: "33%",
          }}
        >
          Every month we receive many applications from people keen to work with
          Sport Maps. It&apos;s fantastic to hear from so many inspiring creatives,
          and we&apos;re keen to work with a diverse sport community.
        </Typography>
        <Button
          component="div"
          align="center"
          variant="contained"
          sx={{
            position: "absolute",
            alignItems: "center",
            textTransform: "none",
            borderRadius: 5,
            height: "8%",
            fontWeight: "bold",
            width: "10%",
            top: "58%",
            right: "45%",
          }}
        >
          Become a contributor
        </Button>
      </Box>
    </>
  );
}
