import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ImageSlider from "./ImageSlider";
import SportImage from "../images/homePage/sportTitle.jpg";
import mapIcon from "../images/homePage/map-location.png";
import communicationIcon from "../images/homePage/communication.png";
import earningIcon from "../images/homePage/earning.png";
import trainerIcon from "../images/homePage/trainer.png";
import PowerFitness from "../images/homePage/power-fitness.png";
import GymTrainer from "../images/homePage/gym-trainer.jpg";
import LogoDraftKings from "../images/homePage/logo-draftkings.png";

export default function Home() {
  return (
    <>
      <Container
        maxWidth={false}
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
        maxWidth={false}
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
          maxWidth={false}
          disableGutters
          sx={{
            justifyContent: "space-around",
            alignItems: "flex-start",
            display: "flex",
            mt: "35px",
          }}
        >
          <Container
            maxWidth={false}
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
            maxWidth={false}
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
            maxWidth={false}
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
            maxWidth={false}
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
        maxWidth={false}
        disableGutters
        sx={{
          background:
            "linear-gradient(to right, rgb(255,65,108), rgb(255,75,43))",
        }}
      >
        <ImageSlider />
      </Container>
      <Container
        maxWidth={false}
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
          maxWidth={false}
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
    </>
  );
}
