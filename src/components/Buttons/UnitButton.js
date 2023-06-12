import "../Card/Card.scss";
import {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";

const UnitButton = ({details, progress, level}) => {
  const {name, id, available} = details

  const [buttonName, setButtonName] = useState('Start')

  useEffect(() => {
    if (progress.current >= id) {
      setButtonName('Review')
    }
  }, [])

  const navigate = useNavigate();

    return (
        <button className={available ? "card__button": "card__button--disabled"} onClick = {() =>  navigate(`/unit/${name}/${id}`)} aria-label={`To ${details.name} unit`}>
         {available ? buttonName : 'Locked'}
      </button>
    );
};

export default UnitButton;


//current click gets the unit id + name of unit