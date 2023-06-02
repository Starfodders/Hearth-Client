import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";

const SectionButton = ({details}) => {
  const {id, available} = details
  const navigate = useNavigate();

    return (
        <button className={available ? "card__button": "card__button--disabled"} onClick = {() => navigate(`/chapters/units/${id}`)} aria-label = {`To ${details.name} section`}>
                {available ? 'Continue' : 'Locked'}
      </button>
    );
};

export default SectionButton;