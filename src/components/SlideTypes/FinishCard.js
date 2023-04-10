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

  return (
    <div className="finish__wrapper">
      <div className="finish__container">
        <h3 className="finish__message">{content}</h3>
        {image ? (
          <div className="finish__image">
            {image ? (
              <>
                <img
                  src={`http://localhost:8080/${image}`}
                  alt="Congratulations on finishing the unit"
                  className="finish__image--el"
                />
                <p className="finish__caption">{caption}</p>
              </>
            ) : null}
          </div>
        ) : null}
        <button
          className="finish__confirm"
          onClick={() => handleUnitComplete()}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default FinishCard;
