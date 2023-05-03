import React from "react";
import Card from "../Card/Card";
import "./ChaptersBlock.scss";
import { useNavigate } from "react-router-dom";


const ChaptersBlock = ({ content, title, level, progress, destination}) => {
  const navigate = useNavigate();

  return (
    <section className="chapters__container">
      <div className="chapters__header">
        <span className="material-symbols-outlined chapters__return" onClick = {() => navigate(destination)}>arrow_back</span>
        <h2 className="chapters__title">{title}</h2>
      </div>
      <div className="chapters__main">
        {content.map((details) => {
          return <Card details={details} level = {level} key = {details.id} progress = {progress}/>;
        })}
      </div>
    </section>
  );
};

export default ChaptersBlock;
