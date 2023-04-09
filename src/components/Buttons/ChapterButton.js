import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";

const ChapterButton = ({details}) => {
  const {id, available} = details;
  const navigate = useNavigate();

    return (
        <button className={available ? "card__button" : "card__button--disabled"} onClick = {() => navigate(`/chapters/${id}`)}>
        {available ? "Continue" : "Locked"}
      </button>
    );
};

export default ChapterButton;