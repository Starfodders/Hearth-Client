import "../UnitSlide/UnitSlide.scss";
import savedOff from "../../assets/icons/savedEmpty.svg";
import savedOn from "../../assets/icons/savedFull.svg";
import resourceIcon from "../../assets/icons/access-resource.svg";
import resourceIconOff from "../../assets/icons/access-resource-none.svg";
import axios from "axios";
import { useEffect, useState } from "react";

const ListCard = ({ slide, format, saveState, saveFunc }) => {
  const { content, title, type, list, images } = slide;

  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [currentListMascot, setCurrentListMascot] = useState(null);
  const [currentListMascotGIF, setCurrentListMascotGIF] = useState(null);
  const [currentPlaying, setCurrentPlaying] = useState(currentListMascot);

  function formatContent(content) {
    return content.split(";");
  }

  function toggleSuggestion() {
    if (list) {
      setCurrentPlaying(currentListMascotGIF);
      setTimeout(() => {
        setCurrentPlaying(currentListMascot);
      }, 480);
      const splitList = list.split("; ");
      let randomIndex = Math.floor(Math.random() * splitList.length);
      let currentWord = `"${splitList[randomIndex]}"`;
      setCurrentSuggestion(currentWord);
    }
  }
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

  return (
    <>
      <div className="slide__container">
        <div className="slide__container__top">
          <div className="slide__container__top--left">
            <span className="material-symbols-outlined card-icon" aria-hidden="true">list</span>
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
        {title !== "null" ? <h1 className="slide__title">{title}</h1> : null}
        {formatContent(content).map((paragraph) => (
          <p className="slide__content" key={paragraph}>
            {paragraph}
          </p>
        ))}
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
            alt = "Interact to create a list suggestion"
          />
        </div>
      </div>
    </>
  );
};

export default ListCard;
