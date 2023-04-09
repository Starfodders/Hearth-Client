import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";

const UnitButton = ({details}) => {
  const {name, id} = details
  const navigate = useNavigate();

    return (
        <button className="card__button" onClick = {() =>  navigate(`/unit/${name}/${id}`)}>
        Continue
      </button>
    );
};

export default UnitButton;


//current click gets the unit id + name of unit