import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FinishCard.scss";

const FinishCard = ({ details }) => {
  const navigate = useNavigate();

  const { id, content, image, caption } = details;
  console.log(image);
  const userID = sessionStorage.getItem("userId");

  function handleUnitComplete() {
    axios
      .patch(`http://localhost:8080/users/update/${userID}/${id}`)
      .then((response) => {
        if (response) {
          navigate(-1);
        }
      })
      .catch((error) => {
        console.log(error + " Error updating user");
      });
  }
  //buttons placed higher up for screen-reader navigation
  if (!image) {
    return (
      <div className="finish__wrapper">
        <div className="finish__container--mod">
          <button
            className="finish__confirm--mod"
            onClick={() => handleUnitComplete()}
            aria-label="Complete Unit"
          >
            Complete
          </button>
          <h3 className="finish__message">{content}</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className="finish__wrapper">
        <div className="finish__container">
          <button
            className="finish__confirm"
            onClick={() => handleUnitComplete()}
            aria-label="Complete Unit"
          >
            Complete
          </button>
          <h3 className="finish__message">{content}</h3>
          {image ? (
            <div className="finish__image">
              {image ? (
                <>
                  <img
                    src= {require(`../../assets/chapterAssets/${image}.png`)}
                    alt="Congratulations on finishing the unit"
                    className="finish__image--el"
                  />
                  <p className="finish__caption" aria-hidden="true">
                    {caption}
                  </p>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
};

export default FinishCard;
