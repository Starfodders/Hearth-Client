import React from "react";
import { Link } from "react-router-dom";
import "./TopLogo.scss";
import {useState} from "react"

const TopLogo = ({name, login}) => {
  const [menuHover, setMenuHover] = useState(false)

  function handleLogOut() {
    sessionStorage.removeItem('authToken')
    login(false)
  }

  return (
    <div className="top__container">
      <div className="spacer"></div>
      <Link to="/home" className="top__link">
        <h2 className="top__title">Hearth</h2>
      </Link>
      <div className="top__profile" onMouseEnter={() => setMenuHover(true)} onMouseLeave =  {()=> setMenuHover(false)}> 
        <span className="material-symbols-outlined top__icon">account_circle</span>
        <p className="top__name">{name}</p>
        { menuHover ? <div className = "top__menu">
          <p className = "top__signout" onClick = {() => handleLogOut()}>Sign Out</p>
        </div>
        : null }

      </div>
    </div>
  );
};

export default TopLogo;
