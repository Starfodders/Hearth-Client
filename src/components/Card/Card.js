import "./Card.scss";
import ProgressBar from "../ProgressBar/ProgressBar";
import ChapterButton from "../Buttons/ChapterButton"
import SectionButton from "../Buttons/SectionButton";
import UnitButton from "../Buttons/UnitButton"

import {useEffect, useState} from "react"

const Card = ({ details, level, progress }) => {
  const {available, overall_available} = details

  const [display, setDisplay] = useState('In Development')

  useEffect(() => {
    if (level === 'chapters') {
      if (!overall_available) {
        setDisplay('In Development')
      }
      else if (details.overall_available && !details.available) {
        setDisplay('Unavailable')
      }
    }
    else if (level === 'sections' || level === 'units') {
      if (!details.available) {
        setDisplay('Unavailable')
      }
    }
    
  }, [])

let button;
  if (level === 'chapters') {
    button = <ChapterButton details={details}/>;
  } else if (level === 'sections') {
    button = <SectionButton details={details} />;
  } else if (level === 'units') {
    button = <UnitButton details={details} />;
  }

  //styling for chapter cards that are not yet completed
  if (level === 'chapters' && !overall_available) {
    return (
      <div className="card__container--off">
        <h2 className="card__name">{details.name}</h2>
        <img
          src={`http://localhost:8080${details.images}`}
          alt={details.name}
          className="card__image"
        />
        <p>{display}</p>
       {button}
      </div>
    );
  }

  return (
    <div className={available ? "card__container" : "card__container--off"}>
      <h2 className="card__name">{details.name}</h2>
      <img
        src={`http://localhost:8080${details.images}`}
        alt={details.name}
        className="card__image"
      />
      {available ? <ProgressBar details = {details} level = {level} progress = {progress}/> :  <p>{display}</p>}
     {button}
    </div>
  );
};

export default Card;
