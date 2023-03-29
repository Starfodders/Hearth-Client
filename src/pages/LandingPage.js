import React from "react";
import "../styles/LandingPage.scss"
import { useState } from "react";
import Login from "../components/Login/Login"
import SignUp from "../components/SignUp/SignUp"

const LandingPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [SignUpPage, setSignUpPage] = useState(false);

    function toggleState() {
      setSignUpPage(!SignUpPage)
    }

  return (<>
    <div className = "landing__container">
        <h1 className = "landing__title">Hearth</h1>
        <h2 className = "landing__slogan">Learn, grow, thrive</h2>
    </div>
    {SignUpPage ? <SignUp toggle = {toggleState}/> : <Login toggle = {toggleState}/>}
  </>);
};

export default LandingPage;
