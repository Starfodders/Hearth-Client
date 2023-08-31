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

const TextCard = ({ slide, format, saveState, saveFunc, darkMode }) => {
  const { content, title, type } = slide;

  function handleSave() {
    const userID = sessionStorage.getItem("userId");
    if (!saveState) {
      const savePage = async () => {
        try {
          // await axios.post(`http://localhost:8080/units/${userID}/${slide.id}`)
          await axios.post(
            `/.netlify/functions/units/save?userID=${userID}&slideID=${slide.id}`
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
          // await axios.delete(`http://localhost:8080/units/${userID}/${slide.id}`)
          await axios.delete(
            `/.netlify/functions/units/unsave?userID=${userID}&slideID=${slide.id}`
          );
          saveFunc(false);
        } catch (err) {
          console.log(err);
        }
      };
      removeSavedPage();
    }
  }

  //also need to apply a bold effect to any word with '|'

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
    <div className={darkMode ? "slide__container--dark" : "slide__container"}>
      <div className="slide__container__top">
        <div className="slide__container__top--left">
          <span className="material-symbols-outlined card-icon">
            <span aria-hidden="true">description</span>
          </span>
          <p className="slide__type">{format(type)} Card</p>
        </div>
        <div className="slide__container__top--right">
          {slide.links ? (
            <a
              href={`${process.env.PUBLIC_URL}/pdfs/${slide.links}.pdf`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={darkMode ? resourceIconDark: resourceIcon}
                className={darkMode ? "resource-link--dark" : "resource-link"}
                alt="Interact to Access External Resource For Current Unit Content"
              />
            </a>
          ) : (
            <img src={darkMode ? resourceIconOffDark : resourceIconOff} className="resource-link-off" alt="" />
          )}
          <img
            src={saveState ? (darkMode ? savedOnDark : savedOn) : (darkMode ? savedOffDark : savedOff)}
            className={saveState ? "units__saved" : "units__saved--off"}
            onClick={() => handleSave()}
            alt={
              saveState
                ? "slide is saved, interact to remove save"
                : "slide is not saved, interact to save"
            }
          />
        </div>
      </div>
      <div className="slide__container__middle">
        {title && <h1 className={darkMode ? "slide__title--dark" : "slide__title"}>{title}</h1>}
        {formatContent(content).map((paragraph, index) => (
          <p className={darkMode ? "slide__content--dark" : "slide__content"} key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TextCard;
