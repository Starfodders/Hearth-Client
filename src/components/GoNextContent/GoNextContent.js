import axios from "axios";
import ProgressContext from "../ProgressContext/ProgressContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GoNextContent.scss"

const GoNextContent = () => {
  const navigate = useNavigate();
  const { navigateUnit, setNavigateUnit } = useContext(ProgressContext);

  //for page refreshes
    useEffect(() => {
        if (!navigateUnit) {
            setNavigateUnit(sessionStorage.getItem('user-progress'))
        }
    }, [])

  function navigateToUnit() {
    //   axios.get(`http://localhost:8080/units/${navigateUnit}/all`)
      axios.get(`/.netlify/functions/units/list?currUnit=${navigateUnit}`)
        .then((response) => {
          const modifyUnitName = response.data[0].name.replace(" ", "%20");
          navigate(`/unit/${modifyUnitName}/${navigateUnit}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  return (
    <div className="resume-container-chapters">
      <button
        className="resume-btn-chapters"
        onClick={() => navigateToUnit()}
        aria-label="Resume progress at most recent unit"
      >
        <span aria-hidden="True">Go To Newest Unit</span>
        <span className="material-symbols-outlined">
          <span aria-hidden="true" className="resume-icon">start</span>
        </span>
      </button>
    </div>
  );
};

export default GoNextContent;
