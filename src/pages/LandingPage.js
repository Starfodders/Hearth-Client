import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from 'react-dom';

import bgForest from "../assets/images/homepage/homeBG.png";
import transition from "../assets/images/transitionForest.png";
// import transitionBot from "../assets/images/transitionBottom.png"
import transitionFire from "../assets/images/transitionFire.png";

import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import Changelog from "../components/Changelog/Changelog";

import "../styles/LandingPage.scss";

const LandingPage = ({ isLoggedIn, setIsLoggedIn, setDisplayName }) => {
  const navigate = useNavigate();
  const [SignUpPage, setSignUpPage] = useState(false);
  const [newSignUp, setNewSignUp] = useState({});
  const [postLogin, setPostLogin] = useState(false);
  const [accountSuccess, setAccountSuccess] = useState(false);
  const [changeLogOn, setChangeLogOn] = useState(false);

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
    if (Object.keys(newSignUp).length > 0) {
      setAccountSuccess(true);
      setTimeout(() => {
        setAccountSuccess(false);
      }, 3000);
    }
  }, [newSignUp]);

  return (
    <div className="wrapper">
      {changeLogOn && createPortal(<Changelog/>, document.body)}
      <section className="landing__container">
        <h1
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
        ) : null}
        {postLogin ? null : <footer className="landing__footer">
          <p className="landing__version" aria-hidden="True">
            Michael Deng © 2023 | Version 1.1 Beta
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
        {SignUpPage ? (
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
          />
        )}
        <img
          src={bgForest}
          className={postLogin ? "bg-solid--disappear" : "bg-solid"}
          alt=""
        />
        <img
          src={transition}
          className={postLogin ? "transition__bg--moving" : "transition__bg"}
          alt=""
        />
        {/* <img src = {transitionBot} className ={postLogin ? "transition__bot--moving": "transition__bot"} alt = ""/> */}
        <img
          src={transitionFire}
          className={
            postLogin ? "transition__fire--moving" : "transition__fire"
          }
          alt=""
        />
      </section>
    </div>
  );
};

export default LandingPage;
