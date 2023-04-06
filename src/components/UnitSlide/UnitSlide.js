import "./UnitSlide.scss";
import { useEffect, useState, useRef } from "react";
import Transcript from "../Transcript/Transcript";
import axios from "axios";
import savedOff from "../../assets/icons/savedEmpty.svg";
import savedOn from "../../assets/icons/savedFull.svg";

const UnitSlide = ({ slide, unitID, currentSaved }) => {
  const { content, title, type, images, transcript, page_number, list } = slide;

  const stringPageNum = page_number.toString();

  const [transcriptState, setTranscriptState] = useState(false);
  const [transcriptData, setTranscriptData] = useState(null);

  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [currentListMascot, setCurrentListMascot] = useState(null);
  const [currentListMascotGIF, setCurrentListMascotGIF] = useState(null);
  const [currentPlaying, setCurrentPlaying] = useState(currentListMascot);

  const [isSaved, setIsSaved] = useState(false);

  const [voiceoverState, setVoiceoverState] = useState(false);
  const [voiceoverObject, setVoiceoverObject] = useState(null);

  //capitalizes the 'Type' for display
  function formatType(string) {
    const changeFirst = string.charAt(0).toUpperCase();
    const restOfString = string.substring(1, string.length);
    return changeFirst.concat(restOfString);
  }

  //toggles transcript on and off
  function toggleTranscript() {
    setTranscriptState(!transcriptState);
    setVoiceoverState(!voiceoverState);
  }

  useEffect(() => {
    currentSaved.forEach((savedPage) => {
      if (savedPage.id === slide.id) {
        setIsSaved(true)
      }
    })
  }, [currentSaved])

  //save functionality
  function handleSave() {
    const userID = sessionStorage.getItem('userId')
    if (!isSaved) {
      const savePage = async () => {
        try {
          const response = await axios.post(`http://localhost:8080/units/${userID}/${slide.id}`)
          setIsSaved(true)
        }
        catch(err) {
          console.log(err);
        }
      }
      savePage()
    }
    if (isSaved) {
      const removeSavedPage = async () => {
        try {
          const response = await axios.delete(`http://localhost:8080/units/${userID}/${slide.id}`)
          setIsSaved(false)
        }
        catch(err) {
          console.log(err);
        }
      }
    removeSavedPage()
    }
  }

  //if transcript exists, grab specific unit ID to make GET for transcript data
  useEffect(() => {
    if (transcript) {
      if (unitID && !transcriptData) {
        const getTranscript = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8080/units/${unitID}/${stringPageNum}`
            );
            setTranscriptData(response.data);
          } catch (err) {
            console.log(err + "Error retrieving Transcript Data");
          }
        };
        getTranscript();
      }
    }
  }, [transcriptState]);

  //   function toggleAudio() {
  //     // console.log(transcriptData.audio);
  //     // const voiceover = new Audio(`http://localhost:8080/${transcriptData.audio}`)
  //     // voiceover.play();
  //   }

  //   useEffect(() => {
  //     if (!voiceoverObject) {
  //         const voiceover = new Audio(`http://localhost:8080/${transcriptData.audio}`)
  //     }
  //     if (voiceoverState) {

  //     }
  //   }, [voiceoverState])

  //toggle to display a new recommendation
  function toggleSuggestion() {
    if (list) {
      setCurrentPlaying(currentListMascotGIF);
      setTimeout(() => {
        setCurrentPlaying(currentListMascot);
      }, 480);
      const splitList = list.split(", ");
      let randomIndex = Math.floor(Math.random() * splitList.length);
      let currentWord = `"${splitList[randomIndex]}"`;
      setCurrentSuggestion(currentWord);
    }
  }

  //if LIST slide exists, get the specific mascot for that list
  useEffect(() => {
    if (list && images) {
      import(`../../assets/images/${images}.gif`).then((gif) =>
        setCurrentListMascotGIF(gif.default)
      );
      import(`../../assets/images/${images}.png`).then((png) =>
        setCurrentListMascot(png.default)
      );
      setCurrentPlaying(currentListMascot);
    }
  }, [list, images, currentListMascot]);

  if (type === "special") {
    return (
      <div className="slide__container--special">
        <div className="slide__container--special--left">
          <h1 className="slide__title--special">{title}</h1>
          <p className="slide__content">{content}</p>
        </div>
        <div className="slide__container--special--right">
          .
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
          <div className="slide__container__top--left">
            <span className="material-symbols-outlined">magic_button</span>
            <p className="slide__type">{formatType(type)} Card</p>
          </div>
          <div className="slide__container__top--right">
          <img src={isSaved ? savedOn : savedOff} className={isSaved ? "units__saved" : "units__saved--off"} onClick = {() => handleSave()}/>
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
        {transcriptState ? <Transcript text={transcriptData} /> : null}
      </div>
    );
  }
  if (type === "list") {
    return (
      <>
        <div className="slide__container">
          <div className="slide__container__top">
            <div className="slide__container__top-left">
              <p className="slide__type">{formatType(type)} Card</p>
              {title !== "null" ? (
                <h1 className="slide__title">{title}</h1>
              ) : null}
            </div>
            <div className="slide__container__top--right">
            <img src={isSaved ? savedOn : savedOff} className={isSaved ? "units__saved" : "units__saved--off"} onClick = {() => handleSave()}/>

            </div>
          </div>
          <p className="slide__content">{content}</p>
        </div>
        <div className="list__container">
          <div className="list__appear">
            {currentSuggestion ? (
              <div className="list__appear--box">
                <p>{currentSuggestion}</p>
              </div>
            ) : null}
          </div>
          <div className="list__mascot">
            <img
              src={currentPlaying}
              className="list__mascot--image"
              onClick={() => toggleSuggestion()}
            />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="slide__container">
      <div className="slide__container__top">
        <div className="slide__top--left">
          <p className="slide__type">{formatType(type)} Card</p>
          <h1 className="slide__title">{title}</h1>
        </div>
        <div className="slide__top--right">
          <img src={isSaved ? savedOn : savedOff} className={isSaved ? "units__saved" : "units__saved--off"} onClick = {() => handleSave()}/>
        </div>
      </div>

      <p className="slide__content">{content}</p>
    </div>
  );
};

export default UnitSlide;
