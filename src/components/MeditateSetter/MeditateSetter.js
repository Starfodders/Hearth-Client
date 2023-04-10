import { useEffect, useState } from "react";
import "./MeditateSetter.scss";

const MeditateSetter = ({ inputTime, setTime, start, startState, pause, setAudio }) => {
  //also validates so that max digits is 2
  function handleDuration(e) {
    const { value } = e.target;
    if (value.length <= 2) {
      setTime(value);
    }
  }

  function handleStart() {
    startState();
  }

  function handlePause() {
    pause();
  }

  return (
    <div className={start ? "active__setting" : "meditate__setting"}>
      <div className="meditate__choices">
        {start ? null : (
          <div className="meditate__choices__block">
            <label className="meditate__choices__label">
              Duration{" "}
              <span className="meditate__choices__label--small">(min)</span>
            </label>
            <input
              type="number"
              onChange={(e) => handleDuration(e)}
              value={inputTime}
              defaultValue="15"
              onKeyPress={(e) => {
                if (isNaN(Number(e.key)) || e.target.value.length >= 2) {
                  e.preventDefault();
                }
              }}
              className="meditate__choices__input"
            ></input>
          </div>
        )}
        {start ? null : (
          <div className="meditate__choices__block">
            <label className="meditate__choices__label--sound">Sound</label>
            <select className="meditate__choices__select" onChange = {(e) => setAudio(e.target.value)}>
              <option value = "campfire" >Campfire</option>
              <option value = "rainforest">Rainforest</option>
              <option value = "waves">Waves</option>
            </select>
          </div>
        )}
        {start ? (
          <div className="meditate__choices__block">
            <label className="meditate__choices__label">Volume</label>
          </div>
        ) : null}

        <div className="meditate__choices__block">
          {start ? (
            <button
              className={"meditate__choices__button--pause"}
              onClick={() => handlePause()}
            >
              Pause
            </button>
          ) : (
            <button
              className={"meditate__choices__button"}
              onClick={() => handleStart()}
            >
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeditateSetter;
