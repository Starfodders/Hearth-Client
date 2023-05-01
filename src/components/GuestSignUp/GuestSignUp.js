import "./GuestSignUp.scss";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";


const GuestSignUp = ({ toggle, resetLogin }) => {
  const [name, setName] = useState("");
  const [notifyExists, setNotifyExists] = useState(true);
  
  function generateGuestUUID() {
    return `Guest${uuidv4()}`
  }

  function generateGuestPW() {
    return uuidv4()
  }

  function handleGuestProfile(e) {
    e.preventDefault();
    localStorage.setItem("guest-profile-name", name);
    localStorage.setItem("guest-profile-id", generateGuestUUID());
    localStorage.setItem("guest-profile-pw", generateGuestPW())

    axios.post('http://localhost:8080/users/signup', {
      given_name : localStorage.getItem('guest-profile-name'),
      email : localStorage.getItem('guest-profile-id'),
      password : localStorage.getItem('guest-profile-pw')
    })
    .then((response) => {
      console.log('Guest Profile Creation Successful');
      toggle(false)
      resetLogin()
    })
    .catch((error) => {
      console.log(error);
    })
  }

  //give a name, then I auto generate a name, auto generate a password and save it all to localStorage. Then send that over to DB for log in credentials

  useEffect(() => {
    if (localStorage.getItem("guest-profile-name" || localStorage.getItem('guest-profile-id'))) {
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
