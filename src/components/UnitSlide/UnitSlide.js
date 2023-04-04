import "./UnitSlide.scss";
import { useEffect, useState } from "react";
import Transcript from "../Transcript/Transcript";
import axios from "axios";

const UnitSlide = ({ slide, unitID }) => {
  const { content, title, type, images, transcript, page_number } = slide;

  const stringPageNum = page_number.toString();

  const [transcriptState, setTranscriptState] = useState(false);
  const [transcriptData, setTranscriptData] = useState(null);

  function toggleTranscript() {
    setTranscriptState(!transcriptState);
    
  }

  useEffect(() => {
    if (transcript) {
      if (unitID && !transcriptData) {
        const getTranscript = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/units/${unitID}/${stringPageNum}`);
            setTranscriptData(response.data);
           
          } catch (err) {
            console.log(err + "Error retrieving Transcript Data");
          }
        };
        getTranscript();
      }
    }
  }, [transcriptState]);

  function formatType(string) {
    const changeFirst = string.charAt(0).toUpperCase();
    const restOfString = string.substring(1, string.length);
    return changeFirst.concat(restOfString);
  }

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
          <span className="material-symbols-outlined slide__start">
            play_circle
          </span>
          <p className="slide__play" onClick={() => toggleTranscript()}>
            Play
          </p>
        </div>
        {transcriptState ? <Transcript text={transcriptData} /> : null}
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
