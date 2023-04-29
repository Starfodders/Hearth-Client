import "./GuestSignUp.scss";
import { useState, useEffect } from "react";

const GuestSignUp = ({ toggle }) => {
  const [name, setName] = useState("");
  const [notifyExists, setNotifyExists] = useState(true);

  function handleGuestProfile(e) {
    e.preventDefault();
    localStorage.setItem("guest-profile", name);
    console.log(localStorage.getItem("guest-profile"));
  }

  useEffect(() => {
    if (localStorage.getItem("guest-profile")) {
      setNotifyExists(true)
    }
    else {
      setNotifyExists(false)
    }
  }, []);

  return (
    <div className="guest__container">
      {notifyExists ? (
        <div className="guest__existing">
          <p className="guest__existing--message">A Guest Profile exists on this device</p>
        </div>
      ) : (
        <div className="guest__existing">
          <p className="guest__existing--message">No Guest Profile Exists</p>
        </div>
      )}
      <p className="guest__disclaimer">
        Guest Profiles do not require an email address and are saved locally to
        your current device. Your progress will not be tracked across devices.
      </p>
      <p className="guest__disclaimer">
        Creating a new Guest Profile on a device that already has one will
        overwrite the existing Guest Profile.
      </p>
      <p className="guest__disclaimer">
        It is recommended to create an account using your email address.
      </p>
      <form
        className="guest__container"
        onSubmit={(e) => handleGuestProfile(e)}
      >
        <label htmlFor="given_name" className="sign__container--label">
          First Name
        </label>
        <input
          type="text"
          name="given_name"
          className="guest__given-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="guest__btn">Create Guest Profile</button>
        <p className="sign__toggle--guest" onClick={() => toggle(false)}>
          Create a regular account instead.
        </p>
      </form>
    </div>
  );
};

export default GuestSignUp;
