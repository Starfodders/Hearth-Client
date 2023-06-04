import React from "react";
import "../styles/LandingPage.scss";
import bgForest from "../assets/images/homepage/homeBG.png"
import transition from "../assets/images/transitionForest.png"
import transitionBot from "../assets/images/transitionBottom.png"
import transitionFire from "../assets/images/transitionFire.png"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";

const LandingPage = ({ isLoggedIn, setIsLoggedIn, setDisplayName }) => {
  const navigate = useNavigate();
  const [SignUpPage, setSignUpPage] = useState(false);
  const [newSignUp, setNewSignUp] = useState({});
  const [postLogin, setPostLogin] = useState(false);

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


  return (
    <div className="wrapper">
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
          Learn, grow, thrive
        </h2>
        <p className="landing__footer" aria-hidden = "True">Michael Deng © 2023 | Version 0.8</p>
        {SignUpPage ? (
          <SignUp toggle={toggleState} getUser={getNewUserSignUp} />
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
        <img src = {bgForest} className = {postLogin ? "bg-solid--disappear" : "bg-solid"} alt = ""/>
        <img src = {transition} className ={postLogin ? "transition__bg--moving": "transition__bg"} alt = ""/>
        {/* <img src = {transitionBot} className ={postLogin ? "transition__bot--moving": "transition__bot"} alt = ""/> */}
        <img src = {transitionFire} className ={postLogin ? "transition__fire--moving": "transition__fire"} alt = ""/>
      </section>
    </div>
  );
};

export default LandingPage;
