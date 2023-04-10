import "../UnitSlide/UnitSlide.scss";
import savedOff from "../../assets/icons/savedEmpty.svg";
import savedOn from "../../assets/icons/savedFull.svg";
import axios from "axios";
import textIcon from "../../assets/icons/textIcon.svg";

const TextCard = ({ slide, format, saveState, saveFunc }) => {
  const { content, title, type } = slide;

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

  function formatContent(content) {
    return content.split(";");
  }

  return (
    <div className="slide__container">
      <div className="slide__container__top">
      <div className="slide__container__top--left">
          <span className="material-symbols-outlined card-icon">description</span>
          <p className="slide__type">{format(type)} Card</p>
        </div>
        <div className="slide__top--right">
          <img
            src={saveState ? savedOn : savedOff}
            className={saveState ? "units__saved" : "units__saved--off"}
            onClick={() => handleSave()}
          />
        </div>
      </div>
      <div className="slide__container__middle">
        <h1 className="slide__title">{title}</h1>
        {formatContent(content).map((paragraph) => (
          <p className="slide__content" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TextCard;
