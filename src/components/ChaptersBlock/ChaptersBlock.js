import React from "react";
import Card from "../Card/Card";
import "./ChaptersBlock.scss";
import { useNavigate } from "react-router-dom";

const ChaptersBlock = ({ content, title, level, progress, destination, imagesArray }) => {
  const navigate = useNavigate();

  return (
    <section className="chapters__container">
      <div className="chapters__header">
        <span
          className="material-symbols-outlined chapters__return"
          onClick={() => navigate(destination)}
          aria-label="Go back one level"
          tabIndex={1}
        >
          {" "}
          <span aria-hidden="true" className="chapters__return">arrow_back</span>
        </span>
        <h2 className="chapters__title">{title}</h2>
      </div>
      <main className="chapters__main" aria-label="Choose content to view">
        {content.map((details, index) => {
          return (
            <Card
              details={details}
              level={level}
              key={details.id}
              progress={progress}
              images = {imagesArray[index]}
            />
          );
        })}
      </main>
    </section>
  );
};

export default ChaptersBlock;
