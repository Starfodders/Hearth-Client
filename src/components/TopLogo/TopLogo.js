import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopLogo.scss";

const TopLogo = ({ name, login }) => {
  const [menuHover, setMenuHover] = useState(false);
  const navigate = useNavigate();

  function handleLogOut() {
    sessionStorage.removeItem("authToken");
    login(false);
    navigate("/");
  }

  return (
    <div className="top__container">
      <div className="spacer"></div>
      <Link to="/home" className="top__link">
        <h2 className="top__title">Hearth</h2>
      </Link>
      <div
        className="top__profile"
        onMouseEnter={() => setMenuHover(true)}
        onMouseLeave={() => setMenuHover(false)}
      >
        <div className="top__profile__preview">
          <div className="top__profile__primary">
            <span className="material-symbols-outlined top__icon">
              account_circle
            </span>
            <p className="top__name">{name}</p>
          </div>
          {menuHover ? (
            <div className="top__profile__opened">
              <span className="material-symbols-outlined logout-icon">logout</span>
              <p className="top__signout" onClick={() => handleLogOut()}>
                Sign Out
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TopLogo;
