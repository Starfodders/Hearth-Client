import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fireStatic from "../assets/images/homepage/yesFire.png";
import stokingFire from "../assets/images/homepage/fireMedium.gif";
import noFire from "../assets/images/homepage/noFireBase.png";
import fireGif from "../assets/images/homepage/fireOn.gif";
import lightFire from "../assets/audio/matches-3.mp3";
import campfireSound from "../assets/audio/campfire-1.mp3";

import Options from "../components/Options/Options";
import BotNav from "../components/BotNav/BotNav";

import "../styles/HomePage.scss";

const HomePage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const currToken = sessionStorage.getItem("authToken");

  // useEffect(() => {
  //     if (!isLoggedIn) {
  //         navigate('/')
  //     }
  // }, [isLoggedIn])

  const [fireOn, setFireOn] = useState(false);
  const [mainFireOn, setMainFireOn] = useState(false);
  const [fireSrc, setFireSrc] = useState(noFire);
  const [homepageState, setHomepageState] = useState(sessionStorage.getItem('homepageState'))

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
  }, [soundState, mainFireOn]);

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
        setFireSrc(fireGif);
      } else {
        setFireSrc(fireStatic);
      }
    }
  }, [animationState]);

  //main loading loop, fires only on first click on page
  useEffect(() => {
    if (fireOn) {
      setFireSrc(stokingFire);
      playMatches();

      setTimeout(() => {
        setMainFireOn(true);
        sessionStorage.setItem('homepageState', true)
        setHomepageState(sessionStorage.getItem('homepageState'))

        if (animationState) {
          setFireSrc(fireGif);
        } else {
          setFireSrc(fireStatic);
        }
      }, 2000);
    }
  }, [fireOn]);

//   useEffect(() => {
//     if (homepageState || mainFireOn) {
//         if (animationState) {
//             setFireSrc(fireGif)
//         } else {
//             setFireSrc(fireStatic)
//         }
//     }
//   }, [])

  return (
    <>
      <div className="home__container">
        <div className="home__container__welcome">
          <h1 className="home__container__title">
            {homepageState ? "Welcome back, Michael" : "Let's Get Warm"}
          </h1>
        </div>
        <div className="home__image">
          <img
            src={fireSrc}
            className="home__image--picture"
            onClick={() => setFireOn(true)}
          />
        </div>
        {currToken}
      </div>
      {mainFireOn ? (
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
