import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";

const ChapterButton = ({details}) => {
  const {id, available, overall_available} = details;
  const navigate = useNavigate();

    if (!overall_available) {
      return (
        <button className="card__button--disabled">
        Locked
      </button>
    )
    
    }
    return (
        <button className={available ? "card__button" : "card__button--disabled"} onClick = {() => navigate(`/chapters/${id}`)}>
        {available ? "Continue" : "Locked"}
      </button>
    );
};

export default ChapterButton;