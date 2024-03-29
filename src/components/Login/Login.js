import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import passwordHide from "../../assets/icons/passwordHide.svg";
import passwordShow from "../../assets/icons/passwordShow.svg";
import ErrorIcon from "../ErrorIcon/ErrorIcon";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import "./Login.scss";

const Login = ({
  toggle,
  setIsLoggedIn,
  setDisplayName,
  postLogin,
  postLoginState,
}) => {
  const navigate = useNavigate();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [rememberUser, setRememberUser] = useState(false);
  const [guestProfile, setGuestProfile] = useState(false);

  const [errorMessage, setErrorMessage] = useState("Error");

  const [forgotPasswordToggle, setForgotPasswordToggle] = useState(false);

  const [formValid, setFormValid] = useState(true);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    blank: "",
  });
  const [errorFields, setErrorFields] = useState({
    email: true,
    password: true,
    blank: true,
  });

  function toggleShowState() {
    if (!passwordHidden) {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
    setPasswordHidden(!passwordHidden);
  }

  //checks localStorage if user has a saved email from 'remember' option
  useEffect(() => {
    if (localStorage.getItem("saved-user-email")) {
      setInputFields({
        ...inputFields,
        email: localStorage.getItem("saved-user-email"),
      });
      setRememberUser(true);
    }
  }, []);

  //toggles flag if a guest profile exists, allowing them to log in using the profile
  useEffect(() => {
    if (
      localStorage.getItem("guest-profile-id") ||
      localStorage.getItem("guest-profile-name")
    ) {
      setGuestProfile(true);
    } else {
      setGuestProfile(false);
    }
  }, [
    localStorage.getItem("guest-profile-id"),
    localStorage.getItem("guest-profile-name"),
  ]);

  function handleInput(e) {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  }

  function resetField(e) {
    const { name } = e.target;
    setErrorFields({ ...errorFields, [name]: true });
    setFormValid(true);
  }

  function handleLogin(e) {
    e.preventDefault();
    for (const [fieldName, fieldValue] of Object.entries(inputFields)) {
      if (fieldValue.length <= 0) {
        setErrorFields({ ...errorFields, ...(errorFields[fieldName] = false) });
        setFormValid(false);
      }
    }
    if (formValid) {
      const { email, password } = inputFields;
      //login, posts to back end to check for an existing account
      // axios.post('http://localhost:8080/users/login', {
      axios.post('/.netlify/functions/user/login', {
          email,
          password,
        })
        //once successful, set token, set logged in to true, go to home page
        .then(({ data }) => {
          postLogin(true);
          if (rememberUser === true) {
            localStorage.setItem("saved-user-email", email);
          } else {
            localStorage.removeItem("saved-user-email");
          }

          setTimeout(() => {
            const { token } = data;
            sessionStorage.setItem("authToken", token);
            const decodedToken = jwt_decode(token);
            sessionStorage.setItem("currentName", decodedToken.name);
            sessionStorage.setItem("userId", decodedToken.id);
            setDisplayName(sessionStorage.getItem("currentName"));

            setIsLoggedIn(true);
            // navigate("/home");
          }, 1000);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          //error is because the element is not false so it doesn't display
          setErrorMessage(error.response.data.message);
        });
    }
  }

  function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.substring(1, name.length);
  }

  function handleGuestLogin() {
    if (guestProfile) {
      // axios.post('http://localhost:8080/users/login', {
      axios.post(`/.netlify/functions/user/login`, {
          email: localStorage.getItem("guest-profile-id"),
          password: localStorage.getItem("guest-profile-pw"),
        })
        .then(({ data }) => {
          postLogin(true);

          setTimeout(() => {
            const { token } = data;
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
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  }

  return (
    <>
      {forgotPasswordToggle ? (
        <ForgotPassword toggle={setForgotPasswordToggle} />
      ) : (
        <form
          className={
            postLoginState ? "login__container--disappear" : "login__container"
          }
          onSubmit={(e) => handleLogin(e)}
          aria-label="Login screen"
        >
          <label htmlFor="email" className="login__container--label">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="login__email"
            value={inputFields.email}
            onChange={(e) => handleInput(e)}
            onClick={(e) => resetField(e)}
            role="user login"
            tabIndex={1}
          ></input>
          <ErrorIcon element={errorFields.email} message={errorMessage} />

          <label htmlFor="password" className="login__container--label">
            Password
          </label>
          <div className="login__pw-box">
            <input
              type={passwordType}
              name="password"
              className="login__password"
              value={inputFields.password}
              onChange={(e) => handleInput(e)}
              onClick={(e) => resetField(e)}
              role="user password"
              tabIndex={2}
            ></input>
            {passwordHidden ? (
              <img
                src={passwordShow}
                className="login__pw-icon"
                onClick={() => toggleShowState()}
                tabIndex={3}
                alt="show password"
              />
            ) : (
              <img
                src={passwordHide}
                className="login__pw-icon"
                onClick={() => toggleShowState()}
                tabIndex={3}
                alt="hide password"
              />
            )}
            <ErrorIcon element={errorFields.password} message={errorMessage} />
          </div>
          <div className="login__lower">
            <div className="login__remember">
              <input
                type="checkbox"
                name="remember-user"
                className="login__remember--box"
                onChange={() => setRememberUser(!rememberUser)}
                checked={rememberUser}
                aria-label={
                  rememberUser
                    ? "Toggle remember email for login off"
                    : "Toggle remember email for login on"
                }
              ></input>
              <label htmlFor="remember-user" aria-hidden="true">
                Remember Me
              </label>
            </div>
            {/* <p
              className="login__reset"
              onClick={() => setForgotPasswordToggle(true)}
            >
              Forgot Password
            </p> */}
          </div>
          <button
            className="login__btn"
            aria-label="Log in, if successful wait 5 seconds for animation to finish"
          >
            Log In
          </button>
          <p
            className="login__toggle"
            onClick={() => toggle(false)}
            aria-label="Interact to toggle form for account creation"
          >
            New to Hearth?  <span className="landing__guest-toggle--bold">Create an account.</span>
          </p>
          {guestProfile ? (
            <div className="login__guest">
              <p className="login__guest--notify" aria-hidden="true">
                Available
              </p>
              <p
                className="login__guest--toggle"
                onClick={() => handleGuestLogin()}
                aria-label="Guest login is available, interact to enter Hearth as a guest"
              >
                <span aria-hidden="true">Log in as a Guest.</span>
              </p>
            </div>
          ) : null}
        </form>
      )}
    </>
  );
};

export default Login;
