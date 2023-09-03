import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import passwordHide from "../../assets/icons/passwordHide.svg";
import passwordShow from "../../assets/icons/passwordShow.svg";
import ErrorIcon from "../ErrorIcon/ErrorIcon";
import GuestSignUp from "../GuestSignUp/GuestSignUp";
import "./SignUpNew.scss";

const SignUpNew = ({
  setSignUpState,
  setPostLogin,
  setDisplayName,
  setIsLoggedIn,
}) => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailLoaderState, setEmailLoaderState] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const emailInputRef = useRef(null);

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

  const removeEmailError = () => {
    if (emailError) {
      setEmailError(false);
    }
  };

  function toggleShowState() {
    if (!passwordHidden) {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
    setPasswordHidden(!passwordHidden);
  }

  function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.substring(1, name.length);
  }

  const checkEmailExists = (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.length > 0) {
      return;
    } else if (!emailPattern.test(email)) {
      setEmailError(true);
    } else {
      axios
        .post("http://localhost:8080/users/exists", { email })
        .then((res) => {
          setEmailLoaderState(true);
          setTimeout(() => {
            setEmailLoaderState(false);
            setSignUpPWStage(true);
            setSignUpState(true);
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

  //unfocuses the email field, QoL effect. Also hides the password when moving onto next step
  useEffect(() => {
    if (signUpPWStage && document.activeElement === emailInputRef.current) {
        emailInputRef.current.blur(); 
    }
    if (emailError && document.activeElement === emailInputRef.current) {
      emailInputRef.current.blur(); 
    }
    if (passwordType === "text" && nameStage) {
      setPasswordType("password");
    }
  }, [emailError, nameStage, signUpPWStage]);

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
    axios.post("http://localhost:8080/users/signup", {
        // axios.post("/.netlify/functions/user/signup", {
        given_name: name || "Traveller",
        email,
        password,
      })
      .then((response) => {        
        axios.post("http://localhost:8080/users/login", {
            email: response.data[0].email,
            password: password,
          })
          .then((response) => {
            console.log(response, ' log in response');
            setPostLogin(true);
            setTimeout(() => {
                const { token } = response.data;
                sessionStorage.setItem("authToken", token);
                const decodedToken = jwt_decode(token);
                sessionStorage.setItem("currentName", decodedToken.name);
                sessionStorage.setItem("userId", decodedToken.id);
                setDisplayName(
                  capitalizeName(sessionStorage.getItem("currentName"))
                );
    
                setIsLoggedIn(true);
                navigate("/home");
              }, 1000);

          })
          .catch((err) => {
            console.log(err, " Unable to log in");
          });
      })
      .catch((err) => {
        console.log(err, " Unable to sign up");
      });
  };

  return (
    <>
      <div
        className={signUpPWStage ? "SU__container--unselect" : "SU__container"}
      >
        <form className="SU__email" onSubmit={(e) => checkEmailExists(e)}>
          <input
            className={
              emailError ? "SU__email--input--error" : "SU__email--input"
            }
            placeholder="Email address"
            ref={emailInputRef}
            value={email}
            onChange={handleEmailValue}
            onClick={() => removeEmailError()}
          ></input>
          {signUpPWStage ? (
            <div className="SU__email--button--done">
              <span className="material-symbols-outlined check-done">done</span>
            </div>
          ) : (
            <button
              className={
                emailError ? "SU__email--button--error" : "SU__email--button"
              }
              type="submit"
            >
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
              pattern="\S{1,20}"
              maxLength="20"
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
