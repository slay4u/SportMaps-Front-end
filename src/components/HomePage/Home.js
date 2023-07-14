import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Container } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import ImageSlider from "./ImageSlider";
import SportImage from "../images/homePage/sportTitle.jpg";
import mapIcon from "../images/homePage/map-location.png";
import communicationIcon from "../images/homePage/communication.png";
import earningIcon from "../images/homePage/earning.png";
import trainerIcon from "../images/homePage/trainer.png";
import PowerFitness from "../images/homePage/power-fitness.png";
import GymTrainer from "../images/homePage/gym-trainer.jpg";
import LogoDraftKings from "../images/homePage/logo-draftkings.png";
import Visa from "../images/homePage/visa.png";
import Maestro from "../images/homePage/maestro.png";

function Copyright(props) {
  return (
    <Typography variant="body1" color="white" align="center" {...props}>
      {"Copyright © "}
      <NavLink
        to="/"
        reloadDocument
        style={({ isActive }) =>
          isActive
            ? {
                color: "white",
              }
            : { color: "white" }
        }
      >
        SportMaps
      </NavLink>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Home() {
  return (
    <>
      <Container
        maxWidth="false"
        disableGutters
        sx={{ width: "100%", position: "relative" }}
      >
        <img src={SportImage} width="100%" alt="sportTitle" height="800px" />
        <Typography
          component="div"
          align="center"
          sx={{
            flexGrow: 1,
            color: "aliceblue",
            position: "absolute",
            top: "17%",
            left: "130px",
            fontSize: "32px",
          }}
        >
          <span style={{ fontSize: "var(--fs-700)", fontStyle: "italic" }}>
            Sport Maps
          </span>
          <br></br>
          <br></br>
          це додаток, який надасть Вам змогу<br></br>
          швидко знаходити спортивні об&apos;єкти,<br></br>a для постачальників
          спортивних послуг -<br></br>
          збільшити їх прибуток
        </Typography>
        <Button
          onClick={() => {
            alert("Clicked");
          }}
          variant="contained"
          sx={{
            flexGrow: 1,
            backgroundColor: "crimson",
            position: "absolute",
            top: "65%",
            left: "330px",
            opacity: "0.95",
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            fontSize: "20px",
            fontWeight: "bold",
            borderRadius: "30px",
          }}
        >
          Завантажити додаток
        </Button>
      </Container>
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          background: "linear-gradient(to right, #67B26F, #4ca2cd)",
          height: "400px",
          marginTop: "-4px",
          paddingTop: "20px",
        }}
      >
        <Typography
          component="div"
          align="center"
          sx={{ flexGrow: 1, color: "aliceblue", fontSize: "35px" }}
        >
          Наші можливості
        </Typography>
        <Container
          maxWidth="false"
          disableGutters
          sx={{
            justifyContent: "space-around",
            alignItems: "flex-start",
            display: "flex",
            mt: "35px",
          }}
        >
          <Container
            maxWidth="false"
            disableGutters
            sx={{
              justifyContent: "center",
              alignItems: "center",
              ml: "100px",
              alignContent: "center",
            }}
          >
            <img
              src={mapIcon}
              alt="mapIcon"
              width="70px"
              height="70px"
              style={{ marginLeft: "180px" }}
            />
            <Typography
              component="div"
              align="center"
              sx={{
                flexGrow: 1,
                color: "aliceblue",
                fontSize: "20px",
                mt: "25px",
              }}
            >
              <span style={{ fontSize: "28px", fontWeight: "bold" }}>
                Пошук
              </span>
              <br></br>
              Знаходження спортивних<br></br>
              об&apos;єктів у будь-якому<br></br>
              населеному пункті
            </Typography>
          </Container>
          <Container
            maxWidth="false"
            disableGutters
            sx={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <img
              src={communicationIcon}
              alt="mapIcon"
              width="70px"
              height="70px"
              style={{ marginLeft: "180px" }}
            />
            <Typography
              component="div"
              align="center"
              sx={{
                flexGrow: 1,
                color: "aliceblue",
                fontSize: "20px",
                mt: "25px",
              }}
            >
              <span style={{ fontSize: "28px", fontWeight: "bold" }}>
                Комунікація
              </span>
              <br></br>
              Знайомство і спілкування<br></br>з однодумцями
            </Typography>
          </Container>
          <Container
            maxWidth="false"
            disableGutters
            sx={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <img
              src={earningIcon}
              alt="mapIcon"
              width="70px"
              height="70px"
              style={{ marginLeft: "175px" }}
            />
            <Typography
              component="div"
              align="center"
              sx={{
                flexGrow: 1,
                color: "aliceblue",
                fontSize: "20px",
                mt: "25px",
              }}
            >
              <span style={{ fontSize: "28px", fontWeight: "bold" }}>
                Заробіток
              </span>
              <br></br>
              Можливість заробітку<br></br>
              або його збільшення для<br></br>
              осіб, які надають<br></br>
              спортивні послуги
            </Typography>
          </Container>
          <Container
            maxWidth="false"
            disableGutters
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mr: "100px",
              alignContent: "center",
            }}
          >
            <img
              src={trainerIcon}
              alt="mapIcon"
              width="70px"
              height="70px"
              style={{ marginLeft: "175px" }}
            />
            <Typography
              component="div"
              align="center"
              sx={{
                flexGrow: 1,
                color: "aliceblue",
                fontSize: "20px",
                mt: "25px",
              }}
            >
              <span style={{ fontSize: "28px", fontWeight: "bold" }}>
                Послуги
              </span>
              <br></br>
              Купівля послуг<br></br>
              спортивної тематики
            </Typography>
          </Container>
        </Container>
      </Container>
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          background:
            "linear-gradient(to right, rgb(255,65,108), rgb(255,75,43))",
        }}
      >
        <ImageSlider />
      </Container>
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          background: "linear-gradient(to right, #f85032, #e73827)",
          padding: "20px 0 25px",
        }}
      >
        <Typography
          component="div"
          align="center"
          sx={{ flexGrow: 1, color: "aliceblue", fontSize: "20px" }}
        >
          <span style={{ fontSize: "35px" }}>Наші партнери</span>
          <br></br>
          Ми співпрацюємо з відомими мережами фітнес-<br></br>
          центрів, організаторами спортивних заходів і<br></br>
          висококваліфікованими індивідуальними тренерами.
        </Typography>
        <Container
          maxWidth="false"
          disableGutters
          sx={{
            alignItems: "flex-start",
            justifyContent: "space-between",
            display: "flex",
            marginTop: "40px",
          }}
        >
          <Container sx={{ width: "400px", marginLeft: "150px" }}>
            <img
              src={PowerFitness}
              alt="PowerFitness"
              height="250px"
              width="250px"
            ></img>
            <Typography
              fontFamily="sans-serif"
              color="aliceblue"
              textAlign="left"
              marginTop="20px"
            >
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                Power Fitness
              </span>
              <br></br>
              <span style={{ fontSize: "14px", marginTop: "-10px" }}>
                Фітнес-клуб
              </span>
              <br></br>
              <br></br>
              {/* <Divider sx={{height: "2px", borderWidth: "0", backgroundColor: "rgb(114, 199, 28)"}}/><br></br> */}
              <span style={{ fontSize: "16px", lineHeight: "23px" }}>
                Фітнес-клуб &quot;Power Fitness&quot; надає послуги:<br></br>
                тренажерний зал, фітнес, дитячий фітнес,<br></br>
                консультація дієтолога, спортивний масаж,<br></br>
                дитяча кімната, єдиноборства, фітнес бар,<br></br>
                спа.
              </span>
            </Typography>
          </Container>
          <Container sx={{ width: "400px" }}>
            <img
              src={GymTrainer}
              alt="GymTrainer"
              height="250px"
              width="350px"
            ></img>
            <Typography
              fontFamily="sans-serif"
              color="aliceblue"
              textAlign="left"
              marginTop="20px"
            >
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                Matt Roberts
              </span>
              <br></br>
              <span style={{ fontSize: "14px", marginTop: "-10px" }}>
                Фітнес-тренер
              </span>
              <br></br>
              <br></br>
              {/* <Divider sx={{height: "2px", borderWidth: "0", backgroundColor: "rgb(114, 199, 28)"}}/><br></br> */}
              <span style={{ fontSize: "16px", lineHeight: "23px" }}>
                Допоможу Вам досягти результату: набір<br></br>
                м&apos;язової маси, схуднення, корекція фігури,<br></br>
                підтримання форми, сушіння, підготовка до<br></br>
                змагань з бб і фітнес бікіні. Індивідуальний<br></br>
                підхід. Режим харчування. Харчування для<br></br>
                набору маси та схуднення.
              </span>
            </Typography>
          </Container>
          <Container sx={{ width: "620px", marginRight: "50px" }}>
            <img src={LogoDraftKings} alt="LogoDraftKings" height="250px"></img>
            <Typography
              fontFamily="sans-serif"
              color="aliceblue"
              textAlign="left"
              marginTop="20px"
            >
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                Draft Kings
              </span>
              <br></br>
              <span style={{ fontSize: "14px", marginTop: "-10px" }}>
                Букмекерська компанія
              </span>
              <br></br>
              <br></br>
              {/* <Divider sx={{height: "2px", borderWidth: "0", backgroundColor: "rgb(114, 199, 28)"}}/><br></br> */}
              <span style={{ fontSize: "16px", lineHeight: "23px" }}>
                Компанія дозволяє користувачам брати участь у щоденних і
                щотижневих<br></br>
                конкурсах, пов&apos;язаних з фентезі-спортом, і вигравати гроші на
                основі<br></br>
                індивідуальних результатів гравців у п&apos;яти основних
                американських видах<br></br>
                спорту (MLB, NHL, NFL, NBA і PGA), футболі Прем&apos;єр-ліги і Ліги
                чемпіонів<br></br>
                УЄФА, автоперегонах NASCAR, Канадській футбольній лізі, XFL,
                змішаних<br></br>
                єдиноборствах (MMA), тенісі, рестлінгу All Elite Wrestling
                (AEW), і WWE.
              </span>
            </Typography>
          </Container>
        </Container>
      </Container>
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          background: "linear-gradient(to right, #0919a3, #004e92)",
          height: "17ch",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "aliceblue",
        }}
      >
        <Container sx={{ marginLeft: "3cm" }}>
          <Container>
            <img
              src={Visa}
              alt="Visa"
              width="110px"
              height="110px"
              style={{ marginRight: "30px" }}
            ></img>
            <img src={Maestro} alt="Maestro" width="110px" height="110px"></img>
          </Container>
          <Copyright sx={{ mb: 2, mr: 25, mt: -2 }} />
        </Container>
        <Typography align="center" width="1500px" sx={{ lineHeight: "0.7cm" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>Адреса</span>
          <br></br>
          30 W Deribasovskaya St., Odesa<br></br>
          31 W Deribasovskaya St., Odesa<br></br>
          32 W Deribasovskaya St., Odesa
        </Typography>
        <Container sx={{ mt: "-20px" }}>
          <Typography
            align="center"
            sx={{ fontSize: "20px", fontWeight: "bold" }}
          >
            Карта сайту
          </Typography>
          <Container
            sx={{
              width: "320px",
              justifyContent: "space-around",
              alignItems: "flex-start",
              display: "flex",
              fontSize: "18px",
            }}
          >
            <Container align="left" sx={{ width: "300px" }}>
              <NavLink
                to="/about"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "white", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                Про нас
              </NavLink>
              <br></br>
              <NavLink
                to="/maps"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "white", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                Карта
              </NavLink>
              <br></br>
              <NavLink
                to="/forums"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "white", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                Форум
              </NavLink>
            </Container>
            <Container align="left" sx={{ width: "300px" }}>
              <NavLink
                to="/coaches"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "white", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                Тренування
              </NavLink>
              <br></br>
              <NavLink
                to="/news"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "white", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                Заходи
              </NavLink>
            </Container>
          </Container>
        </Container>
        <Container sx={{ mt: "10px" }}>
          <Typography align="center" sx={{ lineHeight: "0.7cm" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Зворотній зв&apos;язок
            </span>
            <br></br>
            +38 (000)-000-00-00<br></br>
            sportmaps@gmail.com
          </Typography>
          <Container
            sx={{
              justifyContent: "space-around",
              alignItems: "flex-start",
              display: "flex",
              width: "200px",
              mt: "10px",
            }}
          >
            <Avatar
              sx={{ width: "32px", height: "32px", backgroundColor: "black" }}
            >
              <FacebookIcon fontSize="medium" />
            </Avatar>
            <Avatar
              sx={{ width: "32px", height: "32px", backgroundColor: "black" }}
            >
              <InstagramIcon fontSize="medium" />
            </Avatar>
            <Avatar
              sx={{ width: "32px", height: "32px", backgroundColor: "black" }}
            >
              <TwitterIcon fontSize="medium" />
            </Avatar>
            <Avatar
              sx={{ width: "32px", height: "32px", backgroundColor: "black" }}
            >
              <YouTubeIcon fontSize="medium" />
            </Avatar>
          </Container>
        </Container>
      </Container>
    </>
  );
}
