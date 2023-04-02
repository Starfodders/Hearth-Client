import "./Card.scss";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import React from "react";

const Card = ({ details, level }) => {
  const location = useLocation();
  const navigate = useNavigate();

  function handleChapterChange() {
    if (level) {
      navigate(`${location.pathname}/${details.id}`);
    } else {
      navigate(`/chapters/${details.id}`);
    }
  }

  return (
    <div className="card__container">
      <h2 className="card__name">{details.name}</h2>
      <img
        src={`http://localhost:8080${details.images}`}
        alt={details.name}
        className="card__image"
      />
      <ProgressBar />
      <button className="card__button" onClick={() => handleChapterChange()}>
        Click
      </button>
    </div>
  );
};

export default Card;
