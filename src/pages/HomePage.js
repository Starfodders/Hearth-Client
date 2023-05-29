import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import stokingFire from "../assets/images/homepage/fireMedium.gif";
import noFire from "../assets/images/homepage/noFireBase1.png";

import inactiveBgTop from "../assets/images/transitionTopMod.png";
import inactiveBgBot from "../assets/images/transitionBottom.png";

import bgLeavesBot from "../assets/images/homepage/lit-up-leaves-bot.png";
import bgLeavesTop from "../assets/images/homepage/lit-up-leaves-top.png";

import fireStatic from "../assets/images/homepage/fireOnLesser.png";
import fireStaticOne from "../assets/images/homepage/yesFireOne.png";

import fireGif from "../assets/images/homepage/fireOnLesser.gif";
import fireGifOne from "../assets/images/homepage/fireOnOne.gif";

import lightFire from "../assets/audio/matches-3.mp3";
import campfireSound from "../assets/audio/campfire-1.mp3";

import Options from "../components/Options/Options";
import BotNav from "../components/BotNav/BotNav";
import BeginnerModal from "../components/BeginnerModal/BeginnerModal";

import "../styles/HomePage.scss";
import axios from "axios";

const HomePage = ({ isLoggedIn, name }) => {
  const navigate = useNavigate();
  const currUser = sessionStorage.getItem("userId");
  const [currUserProgress, setCurrUserProgress] = useState();
  const [currUserNavigateUnit, setCurrUserNavigateUnit] = useState();

  useEffect(() => {
    if (!isLoggedIn) {
      if (!sessionStorage.getItem("authToken")) {
        navigate("/");
      }
    }
  }, [isLoggedIn]);

  const [fireOn, setFireOn] = useState(false);
  const [mainFireOn, setMainFireOn] = useState(false);
  const [fireSrc, setFireSrc] = useState(noFire);
  const [homepageState, setHomepageState] = useState(
    sessionStorage.getItem("homepageState")
  );
  const [displayModal, setDisplayModal] = useState(false);
  function handleInitialClick() {
    if (!homepageState) {
      setFireOn(true);
    }
  }

  //checks if the user is new, display beginner modal for intro
  useEffect(() => {
    if (homepageState || mainFireOn) {
      axios
        .get(`http://localhost:8080/users/checkNew/${currUser}`)
        .then(({ data }) => {
          setCurrUserProgress(data.progress);
          setCurrUserNavigateUnit(data.currentUnitToNav);
          if (data.isNew === 1) {
            setDisplayModal(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [mainFireOn]);

  //for animation states
  const [animationState, setAnimationState] = useState(true);

  //for sound states
  const [soundState, setSoundState] = useState(true);
  const [fireLoopAudio, setFireLoopAudio] = useState(new Audio(campfireSound));

  const playMatches = function () {
    const matches = new Audio(lightFire);
    matches.volume = 0.5;
    matches.play();
  };

  //this works, loops without taking up too much memory
  useEffect(() => {
    if (homepageState) {
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
    }
  }, [soundState, homepageState]);

  function toggleAnimation() {
    setAnimationState(!animationState);
  }

  function toggleSound() {
    setSoundState(!soundState);
  }

  //tracks animation state and fires when toggled
  useEffect(() => {
    if (homepageState || mainFireOn) {
      if (animationState) {
        if (currUserProgress === 3) {
          setFireSrc(fireGifOne);
        } else {
          setFireSrc(fireGif);
        }
      } else {
        if (currUserProgress === 3) {
          setFireSrc(fireStaticOne);
        } else {
          setFireSrc(fireStatic);
        }
      }
    }
  }, [animationState, currUserProgress, homepageState, mainFireOn]);

  //main loading loop, fires only on first click on page
  useEffect(() => {
    if (fireOn) {
      setFireSrc(stokingFire);
      playMatches();

      setTimeout(() => {
        setMainFireOn(true);
        sessionStorage.setItem("homepageState", true);
        setHomepageState(sessionStorage.getItem("homepageState"));

        if (animationState) {
          setFireSrc(fireGif);
        } else {
          setFireSrc(fireStatic);
        }
      }, 2000);
    }
  }, [fireOn]);

  function navigateToUnit() {
    //%20 for spaces
    axios
      .get(`http://localhost:8080/units/${currUserNavigateUnit}/all`)
      .then((response) => {
        //replace the spaces in the response with '%20' to match URL string, then navigate there
        const modifyUnitName = response.data[0].name.replace(" ", "%20");
        navigate(`/unit/${modifyUnitName}/${currUserNavigateUnit}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="home__container">
        {displayModal ? <BeginnerModal change={setDisplayModal} /> : null}
        <div className="home__container__welcome">
          <h1 className="home__container__title">
            {homepageState ? (
              `Welcome back, ${name}`
            ) : (
              <div className="home__inactive-message">
                <p>Let's Get Cozy</p>
                <p className="home__inactive-sub">
                  Click on the campfire below to begin.
                </p>
              </div>
            )}
          </h1>
        </div>
        <div className="home__image">
          <img
            src={fireSrc}
            className="home__image--picture"
            alt="app start screen"
            onClick={() => handleInitialClick()}
          />
        </div>
        {homepageState ? (
          <img src={bgLeavesTop} className="home__image--top" alt="" />
        ) : null}
        {homepageState ? (
          <img src={bgLeavesBot} className="home__image--bot" alt="" />
        ) : null}
        {homepageState ? null : (
          <img src={inactiveBgTop} className="home__image--top" alt="" />
        )}
        {homepageState ? null : (
          <img src={inactiveBgBot} className="home__image--bot--off" onClick={() => handleInitialClick()}
          alt="" />
        )}
        {currUserNavigateUnit != 1 && homepageState ? (
          <div className="resume-container">
            <button className="resume-btn" onClick={() => navigateToUnit()}>
              Continue Journey{" "}
              <span className="material-symbols-outlined resume-icon">
                start
              </span>
            </button>
          </div>
        ) : null}
      </div>
      {homepageState ? (
        <Options
          animToggle={toggleAnimation}
          animState={animationState}
          soundToggle={toggleSound}
          soundState={soundState}
        />
      ) : null}
      {homepageState ? <BotNav /> : null}
    </>
  );
};

export default HomePage;
