import React from "react";
import Card from "../Card/Card";
import "./ChaptersBlock.scss";
import { useNavigate } from "react-router-dom";

const ChaptersBlock = ({ content, change, title }) => {
  const navigate = useNavigate();



  return (
    <section className="chapters__container">
      <div className="chapters__header">
        <span className="material-symbols-outlined chapters__return" onClick = {() => navigate(-1)}>arrow_back</span>
        <h2 className="chapters__title">{title}</h2>
      </div>
      <div className="chapters__main">
        {content.map((details) => {
          return <Card details={details} change={change} />;
        })}
      </div>
    </section>
  );
};

export default ChaptersBlock;
