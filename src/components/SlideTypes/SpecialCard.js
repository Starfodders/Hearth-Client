import React from "react";

const SpecialCard = ({ slide }) => {
  const { title, content, images } = slide;
  const mascotPath = require(`../../assets/chapterAssets/${images}.png`);

  function formatContent(content) {
    const paragraphs = content.split(";");

    const formattedParagraphs = paragraphs.map((paragraph) => {
      const words = paragraph.split(" ");

      const formattedWords = words.map((word, index) => {
        if (word.indexOf("|") === 0) {
          const removeTag = word.substring(1); // Remove the '|' character
          return (
            <span key={index} className="content-bold">
              {removeTag}{" "}
            </span>
          );
        }
        return word + " ";
      });

      return <>{formattedWords}</>;
    });

    return formattedParagraphs;
  }

  return (
    <div className="slide__container--special">
      <div className="slide__container--special--left">
        <h1 className="slide__title--special">{title}</h1>
        {formatContent(content).map((paragraph, index) => (
          <p className="slide__content" key={index}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="slide__container--special--right">
        <img
          src={mascotPath}
          className="slide__container--special--mascot"
          alt="Cute Purple Friend"
        />
      </div>
    </div>
  );
};

export default SpecialCard;
