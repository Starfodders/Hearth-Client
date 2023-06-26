import { useNavigate } from "react-router-dom";
import { createPortal } from 'react-dom';
import { useState, useEffect, useContext } from "react";

import TutorialHome from "../components/Tutorials/TutorialHome"

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

import ProgressContext from "../components/ProgressContext/ProgressContext";

import "../styles/HomePage.scss";
import axios from "axios";

const HomePage = ({ isLoggedIn, name }) => {
  const navigate = useNavigate();
  const currUser = sessionStorage.getItem("userId");
  // const [currUserProgress, setCurrUserProgress] = useState();
  // const [currUserNavigateUnit, setCurrUserNavigateUnit] = useState();
  const { progress, navigateUnit, setProgress, setNavigateUnit } =
    useContext(ProgressContext);

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
  const [homeTutorial, setHomeTutorial] = useState(false);

  function handleInitialClick() {
    if (!homepageState) {
      setFireOn(true);
    }
  }

  //checks if the user is new, display beginner modal for intro
  useEffect(() => {
    if (homepageState || mainFireOn) {
      axios.get(`http://localhost:8080/users/checkNew/${currUser}`)
      // axios.get(`/.netlify/functions/user/checkNew?userID=${currUser}`)
      .then(({ data }) => {
          setProgress(data.progress)
          setNavigateUnit(data.currentUnitToNav)
          // if (data.isNew === 1) {
          //   setDisplayModal(true);
          // }
          if (!localStorage.getItem('home-tutorial')) {
            setHomeTutorial(true)
          }
          //stores this value in session in case of refresh and memory is lost
          if (!sessionStorage.getItem('user-progress')) {
            sessionStorage.setItem('user-progress', data.currentUnitToNav)
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
  const [soundState, setSoundState] = useState(false);
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
        if (progress === 3) {
          setFireSrc(fireGifOne);
        } else {
          setFireSrc(fireGif);
        }
      } else {
        if (progress === 3) {
          setFireSrc(fireStaticOne);
        } else {
          setFireSrc(fireStatic);
        }
      }
    }
  }, [animationState, progress, homepageState, mainFireOn]);

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
    axios.get(`http://localhost:8080/units/${navigateUnit}/all`)
    // axios.get(`/.netlify/functions/units/list?currUnit=${navigateUnit}`)
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
        {homeTutorial && createPortal(<TutorialHome toggle = {setHomeTutorial}/>, document.body)}
        <div className="home__container__welcome">
          <h1 className="home__container__title">
            {homepageState ? (
              `Welcome back, ${name}`
            ) : (
              <div className="home__inactive-message">
                <p aria-hidden = "true">Let's Get Cozy</p>
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
            alt={homepageState ? '' : 'Interact to enter Hearth'}
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
        {navigateUnit !== 1 && homepageState ? (
          <div className="resume-container">
            <button className="resume-btn" onClick={() => navigateToUnit()} aria-label = "Resume progress at most recent unit">
              <span aria-hidden = "True">Continue Journey{" "}</span>
              <span className="material-symbols-outlined resume-icon">
                <span aria-hidden = "true">start</span>
              </span>
            </button>
          </div>
        ) : null}
      </div>
      {!displayModal && homepageState ? (
        <Options
          animToggle={toggleAnimation}
          animState={animationState}
          soundToggle={toggleSound}
          soundState={soundState}
          setTutorial = {setDisplayModal}
        />
      ) : null}
      {homepageState && <BotNav />}
    </>
  );
};

export default HomePage;
