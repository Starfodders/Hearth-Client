import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

import bgForest from "../assets/images/homepage/homeBG.png";
import transitionFire from "../assets/images/transitionFire.png";
import stokingFire from "../assets/images/homepage/fireMedium.gif";
import hearthIcon from "../assets/icons/tal-icon.png";
import hearthIcon2 from "../assets/images/mascot.gif";

import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import SignUpNew from "../components/SignUpNew/SignUpNew";
import GuestSignUpNew from "../components/GuestSignUpNew/GuestSIgnUpNew";

import Changelog from "../components/Changelog/Changelog";

import "../styles/LandingPage.scss";

const LandingPage = ({ isLoggedIn, setIsLoggedIn, setDisplayName }) => {
  const navigate = useNavigate();
  const [SignUpPage, setSignUpPage] = useState(false);
  const [newSignUp, setNewSignUp] = useState({});
  const [postLogin, setPostLogin] = useState(false);
  const [toggleStartAnimation, setToggleStartAnimation] = useState(false);
  const [fireAnimationSrc, setFireAnimationSrc] = useState(transitionFire);
  const [accountSuccess, setAccountSuccess] = useState(false);
  const [changeLogOn, setChangeLogOn] = useState(false);
  const [guestSignUp, setGuestSignUp] = useState(false);

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

  function toggleState() {
    setSignUpPage(!SignUpPage);
  }

  function getNewUserSignUp(user) {
    setNewSignUp(user);
  }

  //if already logged in, redirect to home
  useEffect(() => {
    if (isLoggedIn || sessionStorage.getItem("authToken")) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (toggleStartAnimation) {
      setFireAnimationSrc(stokingFire);
    }
  }, [toggleStartAnimation]);

  useEffect(() => {
    if (Object.keys(newSignUp).length > 0) {
      setAccountSuccess(true);
      setTimeout(() => {
        setAccountSuccess(false);
      }, 3000);
    }
  }, [newSignUp]);

  return (
    <div className="wrapper">
      {changeLogOn && createPortal(<Changelog />, document.body)}
      <section className="landing__header">
        <div className="landing__left">
          <div className="landing__left-logo">
            <img src={hearthIcon} alt="" className="landing__left-logo-img" />
          </div>
          <h1 className="landing__left-title">Hearth</h1>
        </div>
        <section className="landing__right">
          <div className="landing__right-signIn">Sign In</div>
          <div className="landing__right-signUp">Sign Up</div>
        </section>
      </section>
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
              postLogin ? "landing__container--disappear" : "landing__container"
            }
          >
            <div className="landing__slogan--container">
              <h1 className={animationClass}>{sloganWord}</h1>
            </div>
            <h2 className="landing__slogan--simple">Simplified.</h2>
            {signUpState ? null : (
              <p className="landing__description">
                A free tool to learn Dialectical Behaviour Therapy on your{" "}
                <span className="landing__description--bolded">own time.</span>
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
        {/* <h1
          className={postLogin ? "landing__title--disappear" : "landing__title"}
        >
          Hearth
        </h1>
        <h2
          className={
            postLogin ? "landing__slogan--disappear" : "landing__slogan"
          }
        >
          Dialectical Behaviour Therapy
        </h2>
        {accountSuccess ? (
          <p className="account-notif">Account Successfully Created</p>
        ) : null} */}
        {postLogin ? null : <footer className="landing__footer">
          <p className="landing__version" aria-hidden="True">
            Michael Deng © 2023 | Version 1.7 Beta
          </p>
          <div className="log__button">
            <button
              onClick={() => setChangeLogOn((prev) => !prev)}
              className="log__button-el"
            >
              {changeLogOn ? 'Close Changelog' : 'View Changelog'}
            </button>
          </div>
        </footer>}
        {/* {SignUpPage ? (
          <SignUp
            toggle={toggleState}
            getUser={getNewUserSignUp}
            notif={setAccountSuccess}
          />
        ) : (
          <Login
            toggle={toggleState}
            newUser={newSignUp}
            setIsLoggedIn={setIsLoggedIn}
            setDisplayName={setDisplayName}
            postLogin={setPostLogin}
            postLoginState={postLogin}
            setToggleStart = {setToggleStartAnimation}
          />
        )} */}
        <img
          src={bgForest}
          className={postLogin ? "bg-solid--disappear" : "bg-solid"}
          alt=""
        />
      </main>
    </div>
  );
};

export default LandingPage;
