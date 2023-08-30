import "../UnitSlide/UnitSlide.scss";
import savedOff from "../../assets/icons/savedEmpty.svg";
import savedOffDark from "../../assets/icons/savedEmptyDark.svg";
import savedOn from "../../assets/icons/savedFull.svg";
import savedOnDark from "../../assets/icons/savedFullDark.svg";
import axios from "axios";
import resourceIcon from "../../assets/icons/access-resource.svg";
import resourceIconDark from "../../assets/icons/access-resource-dark.svg"
import resourceIconOff from "../../assets/icons/access-resource-none.svg";
import resourceIconOffDark from "../../assets/icons/access-resource-none-dark.svg";
import { useEffect, useState } from "react";

const ListCard = ({ slide, format, saveState, saveFunc, darkMode }) => {
  const { content, title, type, list, images } = slide;

  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [currentListMascot, setCurrentListMascot] = useState(null);
  const [currentListMascotGIF, setCurrentListMascotGIF] = useState(null);
  const [currentPlaying, setCurrentPlaying] = useState(currentListMascot);
  const [unusedIndices, setUnusedIndices] = useState([]);

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

  function toggleSuggestion() {
    if (list) {
      setCurrentPlaying(currentListMascotGIF);
  
      setTimeout(() => {
        setCurrentPlaying(currentListMascot);
      }, 480);
  
      if (unusedIndices.length === 0) {
        const splitList = list.split('; ');
        setUnusedIndices(Array.from({ length: splitList.length }, (_, i) => i));
        return;
      }
  
      const randomIndexPosition = Math.floor(Math.random() * unusedIndices.length);
      const randomIndex = unusedIndices[randomIndexPosition];
  
      setUnusedIndices(prev => prev.filter(index => index !== randomIndex));
  
      const splitList = list.split('; ');
      const currentWord = `"${splitList[randomIndex]}"`;
      setCurrentSuggestion(currentWord);
    }
  }
  
  useEffect(() => {
    if (list) {
      const splitList = list.split('; ');
      setUnusedIndices(Array.from({ length: splitList.length }, (_, i) => i));
    }
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

  function handleSave() {
    const userID = sessionStorage.getItem("userId");
    if (!saveState) {
      const savePage = async () => {
        try {
          await axios.post(`http://localhost:8080/units/${userID}/${slide.id}`)
          // await axios.post(`/.netlify/functions/units/save?userID=${userID}&slideID=${slide.id}`);
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

  return (
    <>
    <div className={darkMode ? "slide__container--dark" : "slide__container"}>
        <div className="slide__container__top">
          <div className="slide__container__top--left">
            <span className="material-symbols-outlined card-icon" aria-hidden="true">list</span>
            <p className="slide__type">{format(type)} Card</p>
          </div>
          <div className="slide__container__top--right">
          {slide.links ? <a href={`${process.env.PUBLIC_URL}/pdfs/${slide.links}.pdf`} target="_blank" rel="noreferrer">
              <img
                src={darkMode ? resourceIconDark: resourceIcon}
                className="resource-link"
                alt="Interact to Access External Resource For Current Unit Content"
              />
            </a> : <img
                src={darkMode ? resourceIconOffDark : resourceIconOff}
                className="resource-link-off"
                alt=""
              />}
            <img
            src={saveState ? (darkMode ? savedOnDark : savedOn) : (darkMode ? savedOffDark : savedOff)}
            className={saveState ? "units__saved" : "units__saved--off"}
              onClick={() => handleSave()}
              alt = {saveState ? 'slide is saved, interact to remove save': 'slide is not saved, interact to save'}
              />
          </div>
        </div>
        {title !== "null" ? <h1 className="slide__title">{title}</h1> : null}
        {formatContent(content).map((paragraph, index) => (
          <p className={darkMode ? "slide__content--dark" : "slide__content"} key={index}>
          {paragraph}
          </p>
        ))}
      </div>
      <div className="list__container">
        <div className="list__appear">
          {currentSuggestion ? (
            <div className={darkMode ? "list__appear--box--dark":"list__appear--box"}>
              <p>{currentSuggestion}</p>
            </div>
          ) : null}
        </div>
        <div className="list__mascot">
          <img
            src={currentPlaying}
            className="list__mascot--image"
            onClick={() => toggleSuggestion()}
            alt = "Interact to create a list suggestion"
          />
        </div>
      </div>
    </>
  );
};

export default ListCard;
