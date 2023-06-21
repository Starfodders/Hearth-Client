import "../Card/Card.scss";
import { useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const ChapterButton = ({details, progress}) => {
  const {id, available, overall_available} = details;
  const navigate = useNavigate();

  const [buttonName, setButtonName] = useState('Continue')

  useEffect(() => {
    progress.completedChapters.forEach((chapter) => {
      if (chapter.chapter_id === id) {
        if (chapter.units_complete === details.units) {
          setButtonName('Review')
        }
      }
    })
  }, [])

    if (!overall_available) {
      return (
        <button className="card__button--disabled" aria-label = {`${details.name} is Unavailable At This Time`}>
        Locked
      </button>
    )
    
    }
    return (
        <button className={available ? "card__button" : "card__button--disabled"} onClick = {() => navigate(`/chapters/${id}`)} aria-label = {`To ${details.name} Chapter`}>
        {available ? buttonName : "Locked"}
      </button>
    );
};

export default ChapterButton;