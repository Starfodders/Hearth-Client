import React from "react";
import { Link } from "react-router-dom";
import "./TopLogo.scss"

const TopLogo = () => {
  return (
    <div className = "top__container">
      <Link to="/home" className = "top__link">
        <h2 className = "top__title">Hearth</h2>
      </Link>
    </div>
  );
};

export default TopLogo;
