import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useState, useEffect, useContext } from "react";

import TutorialHome from "../components/Tutorials/TutorialHome";

import bgLeavesBot from "../assets/images/homepage/lit-up-leaves-bot.png";
import bgLeavesTop from "../assets/images/homepage/lit-up-leaves-top.png";

import campfireSound from "../assets/audio/campfire-1.mp3";

import Options from "../components/Options/Options";
import BotNav from "../components/BotNav/BotNav";
import BeginnerModal from "../components/BeginnerModal/BeginnerModal";

import ProgressContext from "../components/ProgressContext/ProgressContext";

import "../styles/HomePage.scss";
import axios from "axios";
import HomePageVisual from "../components/SlidesBackground/HomePageVisual";

const HomePage = ({ isLoggedIn, name }) => {
  const navigate = useNavigate();
  const currUser = sessionStorage.getItem("userId");
  const { progress, navigateUnit, setProgress, setNavigateUnit } =
    useContext(ProgressContext);

  useEffect(() => {
    if (!isLoggedIn) {
      if (!sessionStorage.getItem("authToken")) {
        navigate("/");
      }
    }
  }, [isLoggedIn]);

  const [displayModal, setDisplayModal] = useState(false);
  const [homeTutorial, setHomeTutorial] = useState(false);

  //checks if the user is new, display beginner modal for intro
  useEffect(() => {
    axios
      // .get(`http://localhost:8080/users/checkNew/${currUser}`)
      axios.get(`/.netlify/functions/user/checkNew?userID=${currUser}`)
      .then(({ data }) => {
        setProgress(data.progress);
        setNavigateUnit(data.currentUnitToNav);
        if (!localStorage.getItem("home-tutorial")) {
          setHomeTutorial(true);
        }
        //stores this value in session in case of refresh and memory is lost
        if (!sessionStorage.getItem("user-progress")) {
          sessionStorage.setItem("user-progress", data.currentUnitToNav);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //for animation states
  const [animationState, setAnimationState] = useState(true);

  //for sound states
  const [soundState, setSoundState] = useState(false);
  const [fireLoopAudio, setFireLoopAudio] = useState(new Audio(campfireSound));

  //this works, loops without taking up too much memory
  useEffect(() => {
    if (soundState) {
      fireLoopAudio.play();
      fireLoopAudio.volume = 0.2;
      fireLoopAudio.loop = true;
    } else if (!soundState && fireLoopAudio) {
      fireLoopAudio.pause();
    } else {
      return;
    }
    return () => {
      if (fireLoopAudio && !fireLoopAudio.paused) {
        fireLoopAudio.pause();
      }
    };
  }, [soundState]);

  function toggleAnimation() {
    setAnimationState(!animationState);
  }

  function toggleSound() {
    setSoundState(!soundState);
  }

  function navigateToUnit() {
    //%20 for spaces
    axios
      // .get(`http://localhost:8080/units/${navigateUnit}/all`)
      axios.get(`/.netlify/functions/units/list?currUnit=${navigateUnit}`)
      .then((response) => {
        //replace the spaces in the response with '%20' to match URL string, then navigate there
        const modifyUnitName = response.data[0].name.replace(" ", "%20");
        navigate(`/unit/${modifyUnitName}/${navigateUnit}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="home__container">
        {displayModal ? <BeginnerModal change={setDisplayModal} /> : null}
        {homeTutorial &&
          createPortal(
            <TutorialHome toggle={setHomeTutorial} />,
            document.body
          )}
        <div className="home__container__welcome">
          <h1 className="home__container__title">{`Welcome back, ${name}`}</h1>
        </div>
        <div className="home__image">
          <HomePageVisual state={animationState} progress={progress} />
        </div>

        <img src={bgLeavesTop} className="home__image--top" alt="" />

        <img src={bgLeavesBot} className="home__image--bot" alt="" />

        {navigateUnit !== 1 ? (
          <div className="resume-container">
            <button
              className="resume-btn"
              onClick={() => navigateToUnit()}
              aria-label="Resume progress at most recent unit"
            >
              <span aria-hidden="True">Continue Journey </span>
              <span className="material-symbols-outlined resume-icon">
                <span aria-hidden="true">start</span>
              </span>
            </button>
          </div>
        ) : null}
      </div>
      {!displayModal && (
        <Options
          animToggle={toggleAnimation}
          animState={animationState}
          soundToggle={toggleSound}
          soundState={soundState}
          setTutorial={setDisplayModal}
        />
      )}
      <BotNav />
    </>
  );
};

export default HomePage;
