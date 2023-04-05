import React from "react";
import "../styles/LandingPage.scss";
import bgWaves from "../assets/images/waves.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";

const LandingPage = ({isLoggedIn, setIsLoggedIn, setDisplayName}) => {
  const navigate = useNavigate()
  const [SignUpPage, setSignUpPage] = useState(false);
  const [newSignUp, setNewSignUp] = useState({});

  function toggleState() {
    setSignUpPage(!SignUpPage);
  }

  function getNewUserSignUp(user) {
    setNewSignUp(user);
  }

  //if already logged in, redirect to home
  useEffect(() => {
    if (isLoggedIn || sessionStorage.getItem('authToken')) {
      navigate('/home')
    }
  }, [isLoggedIn])

  return (
    <div className="wrapper">
      <div className="landing__container">
        <h1 className="landing__title">Hearth</h1>
        <h2 className="landing__slogan">Learn, grow, thrive</h2>
        {SignUpPage ? (
          <SignUp toggle={toggleState} getUser={getNewUserSignUp} />
        ) : (
          <Login toggle={toggleState} newUser={newSignUp} setIsLoggedIn={setIsLoggedIn} setDisplayName = {setDisplayName} />
        )}
        <img src={bgWaves} className="bg-wrapper" alt="background waves" />
      </div>
    </div>
  );
};

export default LandingPage;
