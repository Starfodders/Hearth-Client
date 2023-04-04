import { useEffect, useState } from "react";
import "./MeditateSetter.scss";

const MeditateSetter = ({inputTime, setTime, start, pause}) => {
  
    // const [dataLoaded, setDataLoaded] = useState(false)


  //also validates so that max digits is 2
  function handleDuration(e) {
    const { value } = e.target;
    if (value.length <= 2) {
      setTime(value);
    }
  }

  function handleStart(){
    start()
  }

  function handlePause(){
    pause()
  }

  return (
    <div className="med-setting">
      <div className="med-choices">
        <div className="med-choices-block">
          <label className="med-choices-label">Duration (min)</label>
          <input
            type="number"
            onChange={(e) => handleDuration(e)}
            value={inputTime}
            defaultValue = "15"
            onKeyPress={(e) => {
                if (isNaN(Number(e.key)) || e.target.value.length >= 2) {
                  e.preventDefault();
                }
              }}
            className="med-choices-input"
          ></input>
        </div>
        <div className="med-choices-block">
          <label className="med-choices-label">Sound</label>
          <select className="med-choices-select">
            <option>Campfire Crackle</option>
            <option>Test 2</option>
            <option>Test 3</option>
          </select>
        </div>
        <div className="med-choices-block">
          <label className="med-choices-label">Volume</label>
        </div>
        <div className="med-choices-block">
          <button
            className={
              start ? "med-choices-button cancel" : "med-choices-button"
            }
            onClick={() => handleStart()}
          >
            Start
          </button>
          <button
            className={
              start ? "med-choices-button" : "med-choices-button cancel"
            }
            onClick={() => handlePause()}
          >
            Pause
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeditateSetter;
