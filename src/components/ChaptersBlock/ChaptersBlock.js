import React from "react";
import Card from "../Card/Card";
import "./ChaptersBlock.scss";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const ChaptersBlock = ({ content, title, level }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [backPath, setBackPath] = useState(-1)

  useState(() => {
    if (location.pathname !== '/chapters') {
      setBackPath(-1)
    } else {
      setBackPath('/home')

    }
  }, [location])

  return (
    <section className="chapters__container">
      <div className="chapters__header">
        <span className="material-symbols-outlined chapters__return" onClick = {() => navigate(backPath)}>arrow_back</span>
        <h2 className="chapters__title">{title}</h2>
      </div>
      <div className="chapters__main">
        {content.map((details) => {
          return <Card details={details} level = {level} key = {details.id}/>;
        })}
      </div>
    </section>
  );
};

export default ChaptersBlock;
