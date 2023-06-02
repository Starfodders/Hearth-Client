import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";

const UnitButton = ({details}) => {
  const {name, id, available} = details
  const navigate = useNavigate();

    return (
        <button className={available ? "card__button": "card__button--disabled"} onClick = {() =>  navigate(`/unit/${name}/${id}`)} aria-label={`To ${details.name} unit`}>
         {available ? 'Continue' : 'Locked'}
      </button>
    );
};

export default UnitButton;


//current click gets the unit id + name of unit