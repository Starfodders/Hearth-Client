import "../UnitSlide/UnitSlide.scss";
import { useEffect, useState, useRef } from "react";
import savedOff from "../../assets/icons/savedEmpty.svg";
import savedOn from "../../assets/icons/savedFull.svg";
import axios from "axios";
import Transcript from "../Transcript/Transcript";

const TechniqueCard = ({ slide, format, saveState, saveFunc, unitID }) => {
  const { content, title, type, transcript, page_number } = slide;

  //for slides that have audio
  const [voiceoverState, setVoiceoverState] = useState(false);
  const [voiceoverObject, setVoiceoverObject] = useState(null);

  //states for transcripts
  const [transcriptState, setTranscriptState] = useState(false);
  const [transcriptData, setTranscriptData] = useState(null);
  const [transcriptLoaded, setTranscriptLoaded] = useState(false)


  //toggles transcript on and off which also renders specific content below the card
  function toggleTranscript() {
    setTranscriptState(!transcriptState);
    setVoiceoverState(!voiceoverState);
  }

  //save functionality
  function handleSave() {
    const userID = sessionStorage.getItem("userId");
    if (!saveState) {
      const savePage = async () => {
        try {
          const response = await axios.post(
            `http://localhost:8080/units/${userID}/${slide.id}`
          );
          saveFunc(true);
        } catch (err) {
          console.log(err);
        }
      };
      savePage();
    }
    if (saveState) {
      const removeSavedPage = async () => {
        try {
          const response = await axios.delete(
            `http://localhost:8080/units/${userID}/${slide.id}`
          );
          saveFunc(false);
        } catch (err) {
          console.log(err);
        }
      };
      removeSavedPage();
    }
  }

  //If this card has a transcript (1), grab specific unit ID to make GET for transcript data (JSON file)
  useEffect(() => {
    if (transcript && transcriptState) {
        if (!transcriptData) {
            axios
            .get(`http://localhost:8080/units/${unitID}/${page_number}`)
            .then((response) => {
              setTranscriptData(response.data);
              setTranscriptLoaded(true)
            })
            .catch((err) => {
              console.log(err);
            });
        }
    }
  }, [transcriptState, transcriptData]);

  return (
    <div className="slide__container--technique">
      <div className="slide__container__top">
        <div className="slide__container__top--left">
          <span className="material-symbols-outlined">magic_button</span>
          <p className="slide__type">{format(type)} Card</p>
        </div>
        <div className="slide__container__top--right">
          <img
            src={saveState ? savedOn : savedOff}
            className={saveState ? "units__saved" : "units__saved--off"}
            onClick={() => handleSave()}
          />
        </div>
      </div>
      <div className="slide__container__middle">
        <h1 className="slide__title">{title}</h1>
        <p className="slide__content">{content}</p>
      </div>
      <div className="slide__container__bottom">
        <div className="slide__container__bottom__block">
          <span className="material-symbols-outlined slide__start">
            play_circle
          </span>
          <p className="slide__play" onClick={() => toggleTranscript()}>
            Play
          </p>
        </div>
        <div className="slide__container__bottom__block"></div>
      </div>
      {transcriptLoaded && transcriptState ? <Transcript text={transcriptData} /> : null}
    </div>
  );
};

export default TechniqueCard;
