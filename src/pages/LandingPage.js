import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet"

import bgForest from "../assets/images/homepage/homeBG.png";
import hearthIcon from "../assets/icons/tal-icon.png";

import Login from "../components/Login/Login";
import SignUpNew from "../components/SignUpNew/SignUpNew";
import GuestSignUpNew from "../components/GuestSignUpNew/GuestSIgnUpNew";

import Changelog from "../components/Changelog/Changelog";

import "../styles/LandingPage.scss";

const LandingPage = ({ isLoggedIn, setIsLoggedIn, setDisplayName }) => {
  const navigate = useNavigate();
  const [postLogin, setPostLogin] = useState(false);
 
  const [changeLogOn, setChangeLogOn] = useState(false);
  const [guestSignUp, setGuestSignUp] = useState(false);
  const [userSignInPage, setUserSignInPage] = useState(false);

  const [sloganWord, setSloganWord] = useState("Distress Tolerance,");
  const [wordIndex, setWordIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState(
    "landing__slogan--main--up"
  );

  const [signUpState, setSignUpState] = useState(false);

  //handles the sliding text effect
  useEffect(() => {
    const words = [
      "Distress Tolerance,",
      "Mindfulness,",
      "Emotional Regulation,",
      "Interpersonal Effectiveness,",
      "Assertive Communication,",
      "Radical Acceptance,",
      "Overwhelming Emotion,",
      "Self-Compassion,",
      "Coping Skills,",
    ];
    setSloganWord(words[wordIndex]);

    const intervalId = setInterval(() => {
      setAnimationClass("landing__slogan--main--down");

      setTimeout(() => {
        setWordIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % words.length;
          setSloganWord(words[newIndex]);
          setAnimationClass("landing__slogan--main--up");
          return newIndex;
        });
      }, 700);
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [wordIndex]);

  //if already logged in, redirect to home
  useEffect(() => {
    if (isLoggedIn || sessionStorage.getItem("authToken")) {
      navigate("/home");
    }
  }, [isLoggedIn]);
  
  return (
    <div className="wrapper">
      <Helmet>
        <meta name = "description" content = "Hearth Dialectical Behaviour Therapy Sign Up and Sign In page"/>
        <meta name = "keywords" content = "distress tolerance, mindfulness, emotional regulation, interpersonal effectiveness, radical acceptance, wise mind, self-compassion, overwhelming emotion, self-harm, assertive communication."/>
      </Helmet>
      {changeLogOn && createPortal(<Changelog />, document.body)}
      <section className="landing__header">
        <div className="landing__left">
          <div className="landing__left-logo">
            <img src={hearthIcon} alt="" className="landing__left-logo-img" />
          </div>
          <h1 className="landing__left-title">Hearth</h1>
        </div>
        <section className="landing__right">
          <div
            className="landing__right-signIn"
            onClick={() => setUserSignInPage(true)}
          >
            Sign In
          </div>
          <div
            className="landing__right-signUp"
            onClick={() => setUserSignInPage(false)}
          >
            Sign Up
          </div>
        </section>
      </section>
      {userSignInPage ? (
        <main className="landing__wrapper">
          <section
            className={
              postLogin ? "landing__container--disappear" : "landing__container--login"
            }
          >
            <div className="login__title">
              <div className="login__title__image">
                <img
                  src={hearthIcon}
                  alt=""
                  className="login__title__image-el"
                />
              </div>
              <h2 className="login__title--text">Log In</h2>
            </div>
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setDisplayName={setDisplayName}
              postLogin={setPostLogin}
              postLoginState={postLogin}
              toggle = {setUserSignInPage}
            />
          </section>
        </main>
      ) : (
        <main className="landing__wrapper">
          {guestSignUp ? (
            <GuestSignUpNew
              toggle={setGuestSignUp}
              postLogin={postLogin}
              setPostLogin={setPostLogin}
              setDisplayName={setDisplayName}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <section
              className={
                postLogin
                  ? "landing__container--disappear"
                  : "landing__container"
              }
            >
              <div className="landing__slogan--container">
                <h1 className={animationClass}>{sloganWord}</h1>
              </div>
              <h2 className="landing__slogan--simple">Simplified.</h2>
              {signUpState ? null : (
                <p className="landing__description">
                  A free tool to learn Dialectical Behaviour Therapy on your{" "}
                  <span className="landing__description--bolded">
                    own time.
                  </span>
                </p>
              )}
              <SignUpNew
                setSignUpState={setSignUpState}
                setPostLogin={setPostLogin}
                setDisplayName={setDisplayName}
                setIsLoggedIn={setIsLoggedIn}
              />
              {signUpState ? null : (
                <div className="landing__guest">
                  <p
                    className="landing__guest-toggle"
                    onClick={() => setGuestSignUp(true)}
                  >
                    No Email?{" "}
                    <span className="landing__guest-toggle--bold">
                      Continue as Guest
                    </span>
                  </p>
                  <span
                    className="material-symbols-outlined guest-arrow"
                    onClick={() => setGuestSignUp(true)}
                  >
                    arrow_forward
                  </span>
                </div>
              )}
            </section>
          )}
        </main>
      )}
      <img
        src={bgForest}
        className={postLogin ? "bg-solid--disappear" : "bg-solid"}
        alt=""
      />
      {postLogin ? null : (
        <footer className="landing__footer">
          <p className="landing__version" aria-hidden="True">
            Michael Deng © 2023 | Version 2.0
          </p>
          <div className="log__button">
            <button
              onClick={() => setChangeLogOn((prev) => !prev)}
              className="log__button-el"
            >
              {changeLogOn ? "Close Changelog" : "View Changelog"}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default LandingPage;
