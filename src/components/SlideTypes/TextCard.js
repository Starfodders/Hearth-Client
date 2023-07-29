import "../UnitSlide/UnitSlide.scss";
import savedOff from "../../assets/icons/savedEmpty.svg";
import savedOn from "../../assets/icons/savedFull.svg";
import axios from "axios";
import resourceIcon from "../../assets/icons/access-resource.svg";
import resourceIconOff from "../../assets/icons/access-resource-none.svg";
// import textIcon from "../../assets/icons/textIcon.svg";

const TextCard = ({ slide, format, saveState, saveFunc }) => {
  const { content, title, type } = slide;

  function handleSave() {
    const userID = sessionStorage.getItem("userId");
    if (!saveState) {
      const savePage = async () => {
        try {
          await axios.post(`http://localhost:8080/units/${userID}/${slide.id}`)
          // await axios.post(
          //   `/.netlify/functions/units/save?userID=${userID}&slideID=${slide.id}`
          // );
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
          await axios.delete(`http://localhost:8080/units/${userID}/${slide.id}`)
          // await axios.delete(
          //   `/.netlify/functions/units/unsave?userID=${userID}&slideID=${slide.id}`
          // );
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
    <div className="slide__container">
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
                src={resourceIcon}
                className="resource-link"
                alt="Interact to Access External Resource For Current Unit Content"
              />
            </a>
          ) : (
            <img src={resourceIconOff} className="resource-link-off" alt="" />
          )}
          <img
            src={saveState ? savedOn : savedOff}
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
        {title && <h1 className="slide__title">{title}</h1>}
        {formatContent(content).map((paragraph, index) => (
          <p className="slide__content" key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TextCard;
