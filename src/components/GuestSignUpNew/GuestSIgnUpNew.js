import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./GuestSignUpNew.scss"

const GuestSignUpNew = ({
  toggle,
  postLogin,
  setPostLogin,
  setIsLoggedIn,
  setDisplayName,
}) => {
  const [guestName, setGuestName] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setGuestName(e.target.value);
  };

  function generateGuestUUID() {
    return `Guest${uuidv4()}`;
  }

  function generateGuestPW() {
    return uuidv4();
  }

  function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.substring(1, name.length);
  }

  function handleGuestProfile(e) {
    e.preventDefault();
    localStorage.setItem("guest-profile-name", guestName || "Traveler");
    localStorage.setItem("guest-profile-id", generateGuestUUID());
    localStorage.setItem("guest-profile-pw", generateGuestPW());

    axios
      .post("http://localhost:8080/users/signup", {
        // axios.post("/.netlify/functions/user/signup", {
        given_name: localStorage.getItem("guest-profile-name"),
        email: localStorage.getItem("guest-profile-id"),
        password: localStorage.getItem("guest-profile-pw"),
      })
      .then((response) => {
        axios
          .post("http://localhost:8080/users/login", {
            // axios.post(`/.netlify/functions/user/login`, {
            email: localStorage.getItem("guest-profile-id"),
            password: localStorage.getItem("guest-profile-pw"),
          })
          .then((response) => {
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
          });
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }

  return (
    <section className={postLogin ? "landing__container--disappear" : "landing__container"}>
      <div className="landing__slogan--container-small">
        <h1 className="landing__slogan--main-small">Create Guest</h1>
      </div>
      {localStorage.getItem('guest-profile-id') ? 
        <div className="guest__existing">
          <p className="guest__existing--message">
            A Guest Profile already exists on this device. Creating a new account will overrite the existing one.
          </p>
        </div> : null}
      <p className="landing__description">
        A<span className="landing__description--bolded"> guest account </span>
        is saved to your current device. Your progress will not be available
        elsewhere.
      </p>
      <div className="SU__container">
        <form className="SU__name" onSubmit={(e) => handleGuestProfile(e)}>
          <input
            className="SU__name--input"
            placeholder="Your name (optional)"
            value={guestName}
            onChange={handleNameChange}
          ></input>
          <button className="SU__password--button" type="submit">
            Continue
          </button>
        </form>
      </div>
      <div className="landing__guest-adjust">
        <p className="landing__guest-toggle" onClick={() => toggle(false)}>
          Create a
          <span className="landing__guest-toggle--bold"> regular account.</span>
        </p>
        <span
          className="material-symbols-outlined guest-arrow"
          onClick={() => toggle(false)}
        >
          arrow_forward
        </span>
      </div>
    </section>
  );
};

export default GuestSignUpNew;
