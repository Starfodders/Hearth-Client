import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fireStatic from "../assets/images/homepage/yesFire.png";
import stokingFire from "../assets/images/homepage/fireMedium.gif";
import noFire from "../assets/images/homepage/noFireBase.png";
import fireGif from "../assets/images/homepage/fireOn.gif";

import Options from "../components/Options/Options";
import BotNav from "../components/BotNav/BotNav";

import "../styles/HomePage.scss";

const HomePage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const currToken = sessionStorage.getItem("authToken");

  const [fireOn, setFireOn] = useState(false)
  const [mainFireOn, setMainFireOn] = useState(false)
  const [fireSrc, setFireSrc] = useState(noFire);

  const [animationState, setAnimationState] = useState(true);

  function toggleAnimation(){
    setAnimationState(!animationState)
  }
  

  // useEffect(() => {
  //     if (!isLoggedIn) {
  //         navigate('/')
  //     }
  // }, [isLoggedIn])

  useEffect(() => {
    if (mainFireOn) {
      if (animationState) {
        setFireSrc(fireGif);
      } else {
        setFireSrc(fireStatic);
      }
    }
  }, [animationState, mainFireOn]);

  useEffect(() => {
    if (fireOn) {
      setFireSrc(stokingFire);
    //   playMatches();

      setTimeout(() => {
        setMainFireOn(true);
        if (animationState) {
          setFireSrc(fireGif);
        } else {
          setFireSrc(fireStatic);
        }
      }, 2000);
    }   
  }, [fireOn]);

  return (
    <>
      <div className="home__container">
        <div className="home__container__welcome">
          <h1 className="home__container__title">{mainFireOn ? "Welcome back, Michael" : "Let's Get Warm"}</h1>
        </div>
        <div className="home__image">
          <img src={fireSrc} className="home__image--picture" onClick = {() => setFireOn(true)}/>
        </div>
        {currToken}
      </div>
      {mainFireOn ? <Options animToggle = {toggleAnimation} animState = {animationState}/> : null}
      {mainFireOn ? <BotNav /> : null}
    </>
  );
};

export default HomePage;
