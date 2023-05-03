import { useEffect, useState, useRef } from "react";
import "./MeditateSetter.scss";

const MeditateSetter = ({
  inputTime,
  setTime,
  start,
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

  function handleStart() {
    setCurrentVolumeValue(Math.trunc(currAudioObj.volume * 10));
    startState();
  }

  function handlePause() {
    pause();
  }

  const [currentVolumeValue, setCurrentVolumeValue] = useState(
    currAudio.volume
  );

  function handleVolumeUp(audio) {
    const increment = 0.105;
    if (audio.volume + increment > 1) {
      return;
    } else {
      audio.volume += increment;
      setCurrentVolumeValue(Math.trunc(audio.volume * 10));
    }
  }
  function handleVolumeDown(audio) {
    if (audio.volume - 0.1 < 0) {
      return;
    } else {
      audio.volume -= 0.1;
      setCurrentVolumeValue(Math.trunc(audio.volume * 10));
    }
  }
  //austin bray
  //margaret (Aundreya's wife)
  //justin hugh //also recommended the bot nav be more accessible
  //james suresh

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
        {start ? (
          <div className="meditate__choices__block--vol">
            <div className="meditate__choices__volume">
              <p className="meditate__now-playing">Now playing</p>
              <p className="meditate__now-playing">{currAudio}</p>
            </div>
            <div className="meditate__choices__volume">
              <div className="meditate__choices__volume__left">
                <label className="meditate__choices__label">Volume</label>
                <p className="meditate__choices__label--integer">
                  {currentVolumeValue}
                </p>
              </div>
              <div className="meditate__choices__volume__right">
                <span
                  className="material-symbols-outlined volume-el"
                  onClick={() => handleVolumeUp(currAudioObj)}
                >
                  add
                </span>
                <span
                  className="material-symbols-outlined volume-el"
                  onClick={() => handleVolumeDown(currAudioObj)}
                >
                  remove
                </span>
              </div>
            </div>
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
