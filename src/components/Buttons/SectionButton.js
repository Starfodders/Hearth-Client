import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const SectionButton = ({details, progress}) => {
  
  const {id, available} = details
  
  const navigate = useNavigate();

  const [buttonName, setButtonName] = useState('Continue')

  useEffect(() => {
    progress.completedSections.forEach((section) => {
      if (section.section_id === id) { 
        if (section.units_complete === details.units) {
          setButtonName('Review')
        }
      }
    })
  }, [])

    return (
        <button className={available ? "card__button": "card__button--disabled"} onClick = {() => navigate(`/chapters/units/${id}`)} aria-label = {`To ${details.name} section`}>
                {available ? buttonName : 'Locked'}
      </button>
    );
};

export default SectionButton;