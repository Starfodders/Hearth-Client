import "../UnitSlide/UnitSlide.scss";
import savedOff from "../../assets/icons/savedEmpty.svg";
import savedOn from "../../assets/icons/savedFull.svg";
import resourceIcon from "../../assets/icons/access-resource.svg";
import resourceIconOff from "../../assets/icons/access-resource-none.svg";
import axios from "axios";


const SummaryCard = ({slide, format, saveState, saveFunc}) => {
    const { content, title, type } = slide;

    function handleSave() {
        const userID = sessionStorage.getItem('userId')
        if (!saveState) {
          const savePage = async () => {
            try {
              const response = await axios.post(`http://localhost:8080/units/${userID}/${slide.id}`)
              saveFunc(true)
            }
            catch(err) {
              console.log(err);
            }
          }
          savePage()
        }
        if (saveState) {
          const removeSavedPage = async () => {
            try {
              const response = await axios.delete(`http://localhost:8080/units/${userID}/${slide.id}`)
              saveFunc(false)
            }
            catch(err) {
              console.log(err);
            }
          }
        removeSavedPage()
        }
      }

      function formatContent(content) {
        return content.split(';')
      }


  return (
    <div className="slide__container">
      <div className="slide__container__top">
        <div className="slide__container__top--left">
        <span className="material-symbols-outlined card-icon" aria-hidden="true">summarize</span>
          <p className="slide__type">{format(type)} Card</p>
        </div>
        <div className="slide__container__top--right">
        {slide.links ? <a href={`${process.env.PUBLIC_URL}/pdfs/${slide.links}.pdf`} target="_blank" rel="noreferrer">
              <img
                src={resourceIcon}
                className="resource-link"
                alt="access page resource"
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
      <h1 className="slide__title" aria-label = {title}>{title}</h1>
     {formatContent(content).map((paragraph)=>  <p className="slide__content" key ={paragraph}>{paragraph}</p>)}
    </div>
  );
};

export default SummaryCard;

