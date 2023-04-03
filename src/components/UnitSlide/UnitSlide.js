import "./UnitSlide.scss";
import {useState} from "react";
import Transcript from "../Transcript/Transcript";

const UnitSlide = ({ slide, index }) => {
  const { content, title, type, images, transcript } = slide;
  //   console.log(slide);
  //   console.log(transcript);

  const [transcriptState, setTranscriptState] = useState(false)

  function toggleTranscript() {
    setTranscriptState(!transcriptState)
  }

  function formatType(string) {
    const changeFirst = string.charAt(0).toUpperCase();
    const restOfString = string.substring(1, string.length);
    return changeFirst.concat(restOfString);
  }

  //   console.log(formatType());

  if (type === "special") {
    return (
      <div className="slide__container--special">
        <div className="slide__container--special--left">
          <h1 className="slide__title--special">{title}</h1>
          <p className="slide__content">{content}</p>
        </div>
        <div className="slide__container--special--right">
          <img
            src={`http://localhost:8080/${images}`}
            className="slide__container--special--mascot"
          />
        </div>
      </div>
    );
  }
  if (type === "technique") {
    return (
      <div className="slide__container--technique">
        <div className="slide__container__top">
          <span className="material-symbols-outlined">magic_button</span>
          <p className="slide__type">{formatType(type)} Card</p>
        </div>
        <div className="slide__container__middle">
          <h1 className="slide__title">{title}</h1>
          <p className="slide__content">{content}</p>
        </div>
        <div className="slide__container__bottom">
          <span className="material-symbols-outlined slide__start">play_circle</span>
          <p className="slide__play" onClick = {() => toggleTranscript()}>Play</p>
        </div>
        {transcriptState ? <Transcript text = {transcript}/> : null}
      </div>
    );
  }
  return (
    <div className="slide__container">
      <p className="slide__type">{formatType(type)} Card</p>
      <h1 className="slide__title">{title}</h1>
      <p className="slide__content">{content}</p>
    </div>
  );
};

export default UnitSlide;
