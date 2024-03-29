import "./Card.scss";
import ProgressBar from "../ProgressBar/ProgressBar";
import ChapterButton from "../Buttons/ChapterButton";
import SectionButton from "../Buttons/SectionButton";
import UnitButton from "../Buttons/UnitButton";
import CardImageImports from "./CardImageImports";
import ProgressContext from "../ProgressContext/ProgressContext";

import { useEffect, useState, useContext } from "react";

const Card = ({ details, level, progress }) => {
  const { available, overall_available } = details;

  const [display, setDisplay] = useState("In Development");

  const { darkMode } = useContext(ProgressContext);

  useEffect(() => {
    if (level === "chapters") {
      if (!overall_available) {
        setDisplay("In Development");
      }
      if (details.overall_available && !details.available) {
        setDisplay("Unavailable");
      }
    } else if (level === "sections" || level === "units") {
      if (!details.available) {
        setDisplay("Unavailable");
      }
    }
  }, [level]);

  let button;
  if (level === "chapters") {
    button = <ChapterButton details={details} progress={progress} />;
  } else if (level === "sections") {
    button = <SectionButton details={details} progress={progress} />;
  } else if (level === "units") {
    button = <UnitButton details={details} progress={progress} />;
  }

  //styling for chapter cards that are not yet completed
  if (level === "chapters" && !overall_available) {
    return (
      <div className="card__container--off">
        <h2 className="card__name">{details.name}</h2>
        <CardImageImports src={details} />
        <p>{display}</p>
        {button}
      </div>
    );
  }

  return (
    <div className={available ? (darkMode ? "card__container--dark" : "card__container") : (darkMode ? "card__container--off--dark" : "card__container--off")}>
      <h2 className={darkMode ? "card__name--dark" : "card__name"}>{details.name}</h2>
      <CardImageImports src={details} />
      {available ? (
        <ProgressBar details={details} level={level} progress={progress} />
      ) : (
        <p className={darkMode ? "card__display" : null}>{display}</p>
      )}
      {button}
    </div>
  );
};

export default Card;
