import { useEffect, useState, useRef } from "react";
import "./MeditateSetter.scss";
import MeditateActive from "../MeditateActive/MeditateActive";

const MeditateSetter = ({
  inputTime,
  setTime,
  start,
  active,
  setActive,
  startState,
  pause,
  currAudio,
  setAudio,
  currAudioObj,
}) => {
  //also validates so that max digits is 2
  function handleDuration(e) {
    const { value } = e.target;
    if (value.length <= 2) {
      setTime(value);
    }
  }

  //when 'START' is clicked, both Start and Active flags are true
  function handleStart() {
    startState();
  }

  //only toggles Active to false, START is overall still true until session is ended prematurely or concludes naturally
  function handlePause() {
    pause();
  }

  return (
    <div className={start ? "active__setting" : "meditate__setting"}>
      <div className="meditate__choices">
        {/* Block determines Duration of Meditation */}
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
        {/* Block Determines Sound Chosen for Meditation */}
        {start ? null : (
          <div className="meditate__choices__block">
            <label className="meditate__choices__label--sound">Sound</label>
            <select
              className="meditate__choices__select"
              onChange={(e) => setAudio(e.target.value)}
              value={currAudio}
            >
              <option value="campfire">Campfire</option>
              <option value="rainforest">Rainforest</option>
              <option value="waves">Waves</option>
              <option value="minecraft">Minecraft</option>
            </select>
          </div>
        )}
        {/* If Started, change to display the active panel */}
        {start ? (
          <MeditateActive
            currAudio={currAudio}
            currAudioObj={currAudioObj}
            active={active}
            resume={setActive}
            pause={handlePause}
          />
        ) : (
          <div className="meditate__choices__block">
            <button
              className="meditate__choices__button"
              onClick={() => handleStart()}
            >
              <span className="material-symbols-outlined inner-icon">play_arrow</span>
              Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditateSetter;
