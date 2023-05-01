import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import passwordHide from "../../assets/icons/passwordHide.svg";
import passwordShow from "../../assets/icons/passwordShow.svg";
import ErrorIcon from "../ErrorIcon/ErrorIcon";
import GuestSignUp from "../GuestSignUp/GuestSignUp";
import "./SignUp.scss";

const SignUp = ({ toggle, getUser }) => {
  const [errorMessage, setErrorMessage] = useState("Error");

  const [isGuestSignUp, setIsGuestSignUp] = useState(false);

  //handles password display and state
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordType, setPasswordType] = useState("password");

  function toggleShowState() {
    if (!passwordHidden) {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
    setPasswordHidden(!passwordHidden);
  }

  //regex that accepts at least a single letter, digit, symbol. A single @ to separate emails
  // backticks for string temp literal, ^ for start of input, $ for end. The i means its case insensitive
  //then accepts any letter and digit, . and - within the domain
  //then accepts at least 2 letters from a-z
  // const formRegexPattern = new RegExp('^\\w+[\\w\\.-]*@\\w+([-]\\w+)*\\.\\w{2,}$', 'i');

  const [formValid, setFormValid] = useState(true);
  const [inputFields, setInputFields] = useState({
    given_name: "",
    email: "",
    password: "",
    blank: "",
  });
  const [errorFields, setErrorFields] = useState({
    given_name: true,
    email: true,
    password: true,
    blank: true,
  });

  function handleInput(e) {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  }

  function resetField(e) {
    const { name } = e.target;
    setErrorFields({ ...errorFields, [name]: true });
    setFormValid(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (const [fieldName, fieldValue] of Object.entries(inputFields)) {
      if (fieldValue.length <= 0) {
        setErrorFields({ ...errorFields, ...(errorFields[fieldName] = false) });
        setFormValid(false);
      }
    }
    if (formValid) {
      const { given_name, email, password } = inputFields;
      axios
        .post("http://localhost:8080/users/signup", {
          given_name,
          email,
          password,
        })
        .then((response) => {
          //sends the new user data up to parent, toggle to login page and populate the fields
          getUser(response.data[0]);
          toggle();
        })
        .catch((error) => {
          console.log(error.response.data);
          // setErrorFields
          setErrorFields((prev) => ({ ...prev, email: false }));
          setErrorMessage(error.response.data.message);
        });
    }
  }

  return (
    <>
      {isGuestSignUp ? (
        <GuestSignUp toggle = {setIsGuestSignUp} resetLogin = {toggle}/>
      ) : (
        <form className="sign__container" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="given_name" className="sign__container--label">
            First Name
          </label>
          <input
            type="text"
            name="given_name"
            className="sign__given-name"
            value={inputFields.given_name}
            onChange={(e) => handleInput(e)}
            onClick={(e) => resetField(e)}
          ></input>
          <ErrorIcon element={errorFields.given_name} message={errorMessage} />
          <label htmlFor="email" className="sign__container--label">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="sign__email"
            value={inputFields.email}
            onChange={(e) => handleInput(e)}
            onClick={(e) => resetField(e)}
            pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          ></input>
          <ErrorIcon element={errorFields.email} message={errorMessage} />
          <label htmlFor="password" className="sign__container--label">
            Password
          </label>
          <div className="sign__pw-box">
            <input
              type={passwordType}
              name="password"
              className="sign__password"
              value={inputFields.password}
              onChange={(e) => handleInput(e)}
              onClick={(e) => resetField(e)}
            ></input>
            {passwordHidden ? (
              <img
                src={passwordShow}
                className="sign__pw-icon"
                onClick={() => toggleShowState()}
              />
            ) : (
              <img
                src={passwordHide}
                className="sign__pw-icon"
                onClick={() => toggleShowState()}
              />
            )}
            <ErrorIcon element={errorFields.password} message={errorMessage} />
          </div>
          <button className="sign__btn">Sign Up</button>
          <p className="sign__toggle" onClick={() => toggle()}>
            Already have an account? Click here to log in.
          </p>
          <p
            className="sign__toggle--guest"
            onClick={() => setIsGuestSignUp(true)}
          >
            No Email? Create a Guest Profile.
          </p>
        </form>
      )}
    </>
  );
};

export default SignUp;
