import "./Card.scss";
import ProgressBar from "../ProgressBar/ProgressBar";
import ChapterButton from "../Buttons/ChapterButton"
import SectionButton from "../Buttons/SectionButton";
import UnitButton from "../Buttons/UnitButton"

const Card = ({ details, level }) => {
  const {available} = details
//   const location = useLocation();
//   const navigate = useNavigate();


let button;
  if (level === 'chapters') {
    button = <ChapterButton details={details}/>;
  } else if (level === 'sections') {
    button = <SectionButton details={details} />;
  } else if (level === 'units') {
    button = <UnitButton details={details} />;
  }

  return (
    <div className={available ? "card__container" : "card__container--off"}>
      <h2 className="card__name">{details.name}</h2>
      <img
        src={`http://localhost:8080${details.images}`}
        alt={details.name}
        className="card__image"
      />
      <ProgressBar />
     {button}
    </div>
  );
};

export default Card;
