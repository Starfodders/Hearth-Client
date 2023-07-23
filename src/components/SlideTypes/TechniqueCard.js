import "../UnitSlide/UnitSlide.scss";
import { useEffect, useState } from "react";
import savedOff from "../../assets/icons/savedEmpty.svg";
import savedOn from "../../assets/icons/savedFull.svg";
import resourceIcon from "../../assets/icons/access-resource.svg";
import resourceIconOff from "../../assets/icons/access-resource-none.svg";
import axios from "axios";
import Transcript from "../Transcript/Transcript";

const TechniqueCard = ({ slide, format, saveState, saveFunc, unitID, notifyChange}) => {
  const { content, title, type, transcript, audio, page_number } = slide;

  //states for transcripts
  const [transcriptState, setTranscriptState] = useState(false);
  const [transcriptData, setTranscriptData] = useState(null);
  const [transcriptLoaded, setTranscriptLoaded] = useState(false);
  
  
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
  
  //toggles transcript on and off which also renders specific content below the card
  function toggleTranscript() {
    setTranscriptState((prevState) => !prevState);
    if (transcriptState) {
      setTranscriptLoaded(true);
    } else {
      setTranscriptLoaded(false);
      setTranscriptData(null);
    }
  }

  //whenever slide changes, collapse transcript
  useEffect(() => {
    if (transcriptState) {
      setTranscriptState(false)
    }
  }, [notifyChange])

  
  //save functionality
  function handleSave() {
    const userID = sessionStorage.getItem("userId");
    if (!saveState) {
      const savePage = async () => {
        try {
          // await axios.post(`http://localhost:8080/units/${userID}/${slide.id}`)
          await axios.post(`/.netlify/functions/units/save?userID=${userID}&slideID=${slide.id}`);

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
          // await axios.delete(`http://localhost:8080/units/${userID}/${slide.id}`)
          await axios.delete(`/.netlify/functions/units/unsave?userID=${userID}&slideID=${slide.id}`);

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
        axios.get(
            `/.netlify/functions/units/transcript?unitID=${unitID}&pageNum=${page_number}`)
        // axios.get(`http://localhost:8080/units/transcript/${unitID}/${page_number}`)
          .then((response) => {
            setTranscriptData(response.data);
            setTranscriptLoaded(true);
            
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
          <span className="material-symbols-outlined card-icon" aria-hidden="true">
            magic_button
          </span>
          <p className="slide__type">{format(type)} Card</p>
        </div>
        <div className="slide__container__top--right">
        {slide.links ? <a href={`${process.env.PUBLIC_URL}/pdfs/${slide.links}.pdf`} target="_blank" rel="noreferrer">
              <img
                src={resourceIcon}
                className="resource-link"
                alt="Interact to Access External Resource For Current Unit Content"
              />
            </a> : <img
                src={resourceIconOff}
                className="resource-link-off"
                alt=""
              />}
          <img
            src={saveState ? savedOn : savedOff}
            className={saveState ? "units__saved" : "units__saved--off"}
            onClick={() => handleSave()}
            alt = {saveState ? 'slide is saved, interact to remove save': 'slide is not saved, interact to save'}
          />
        </div>
      </div>
      <div className="slide__container__middle">
        <h1 className="slide__title">{title}</h1>
        {formatContent(content).map((paragraph, index) => (
          <p className="slide__content" key={index}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className={transcript === '1' ? "slide__container__bottom" : "slide__container__bottom--none"}>
        <div className="slide__container__bottom__block">
          {transcriptState ? (
            <span
              className="material-symbols-outlined slide__start--less"
              onClick={() => toggleTranscript()}
              aria-label = "Interact to close technique transcript"
            >
              <span aria-hidden="true">unfold_less</span>
            </span>
          ) : (
            <span
              className="material-symbols-outlined slide__start--more"
              onClick={() => toggleTranscript()}
              aria-label = "Interact to open technique transcript"
            >
              <span aria-hidden="true">unfold_more</span>
            </span>
          )}
          <p className="slide__play--toggle" onClick={() => toggleTranscript()}>
            {transcriptState ? "View Less" : "View More"}
          </p>
        </div>
        <div className="slide__container__bottom__block">
          {audio ? 
              <p className="slide__play">Audio Available</p>
            :
            <p className="slide__play">No Audio Available</p>
          }
        </div>
      </div>
      {transcript && transcriptLoaded && transcriptState ? (
        <Transcript text={transcriptData} state={transcriptState} />
      ) : null}
    </div>
  );
};

export default TechniqueCard;
