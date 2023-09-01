import axios from "axios";
import { useState } from "react";
import passwordHide from "../../assets/icons/passwordHide.svg";
import passwordShow from "../../assets/icons/passwordShow.svg";
import ErrorIcon from "../ErrorIcon/ErrorIcon";
import GuestSignUp from "../GuestSignUp/GuestSignUp";
import "./SignUpNew.scss";

const SignUpNew = () => {
  const [email, setEmail] = useState("");
  const [emailLoaderState, setEmailLoaderState] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [signUpPWStage, setSignUpPWStage] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordError, setPasswordError] = useState(false);

  const [nameStage, setNameStage] = useState(false);
  const [name, setName] = useState("");

  const handleEmailValue = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordValue = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  function toggleShowState() {
    if (!passwordHidden) {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
    setPasswordHidden(!passwordHidden);
  }

  const checkEmailExists = (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.length > 0) {
      return
    } 
    else if (!emailPattern.test(email)) {
        setEmailError(true)
    }
    else {
      axios
        .post("http://localhost:8080/users/exists", { email })
        .then((res) => {
          setEmailLoaderState(true);
          setTimeout(() => {
            setEmailLoaderState(false);
            setSignUpPWStage(true);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          setEmailLoaderState(true);
          setTimeout(() => {
            setEmailLoaderState(false);
            setEmailError(true);
          }, 1500);
        });
    }
  };
  

  const validatePassword = (e) => {
    e.preventDefault();
    if (!password.length > 0) {
      setPasswordError(true);
    } else {
      setNameStage(true);
    }
  };

  const confirmAccount = (e) => {
    e.preventDefault();
    if (!name.length > 0) {
      setName("Traveler");
    }
    console.log(email, password, name);
  };

  return (
    <>
      <div
        className={signUpPWStage ? "SU__container--unselect" : "SU__container"}
      >
        <form className="SU__email" onSubmit={(e) => checkEmailExists(e)}>
          <input
            className="SU__email--input"
            placeholder="Email address"
            // pattern="[A-Za-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            value={email}
            onChange={handleEmailValue}
          ></input>
          {signUpPWStage ? (
            <div className="SU__email--button--done">
              <span className="material-symbols-outlined">done</span>
            </div>
          ) : (
            <button className="SU__email--button" type="submit">
              Sign Up
            </button>
          )}
          {emailLoaderState ? <div className="loader"></div> : null}
        </form>
        {emailError ? (
          <div className="SU__email--error">
            Email is either invalid or already exists
          </div>
        ) : null}
      </div>
      {signUpPWStage ? (
        <div
          className={nameStage ? "SU__container--unselect" : "SU__container"}
        >
          <form className="SU__password" onSubmit={(e) => validatePassword(e)}>
            <input
              type={passwordType}
              className="SU__password--input"
              placeholder="Create a password"
              value={password}
              onChange={handlePasswordValue}
            ></input>
            {passwordHidden ? (
              <img
                src={passwordShow}
                className="SU__password--reveal"
                onClick={() => toggleShowState()}
                alt="hide password"
              />
            ) : (
              <img
                src={passwordHide}
                className="SU__password--reveal"
                onClick={() => toggleShowState()}
                alt="show password"
              />
            )}
            {nameStage ? (
              <div className="SU__email--button--done">
                <span className="material-symbols-outlined">done</span>
              </div>
            ) : (
              <button className="SU__password--button" type="submit">
                Continue
              </button>
            )}
          </form>
          {passwordError ? (
            <div className="SU__email--error">Missing password!</div>
          ) : null}
        </div>
      ) : null}
      {nameStage ? (
        <div className="SU__container">
          <form className="SU__name" onSubmit={(e) => confirmAccount(e)}>
            <input
              className="SU__name--input"
              placeholder="Your name (optional)"
              value={name}
              onChange={handleNameChange}
            ></input>
            <button className="SU__password--button" type="submit">
              Continue
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default SignUpNew;

/* sign up component
    input field that accepts an email
    button that triggers state change, checks against DB if email exists
    if email doesnt exist, generate the password input field
    if email exists, flag an error
    validate password */
