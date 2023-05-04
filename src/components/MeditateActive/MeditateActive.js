import "../MeditateSetter/MeditateSetter.scss";
import { useState, useEffect } from "react";
import EndMeditate from "../EndMeditate/EndMeditate";

const MeditateActive = ({ currAudio, currAudioObj, active, resume, pause }) => {

    const [endSession, setEndSession] = useState(false)
  const [currentVolumeValue, setCurrentVolumeValue] = useState(
    currAudio.volume
  );

  useEffect(() => {
    if (active) {
        setCurrentVolumeValue(Math.trunc(currAudioObj.volume * 10));
    }
  }, [active])

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

  return (
    <>
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
      <div className="meditate__choices__block--active">
        {active ? (
          <button
            className="meditate__choices__button--pause"
            onClick={() => pause()}
          >
            <span className="material-symbols-outlined inner-icon">pause</span>
            Pause
          </button>
        ) : (
          <button
            className="meditate__choices__button--pause"
            onClick={() => resume(true)}
          >
            <span className="material-symbols-outlined inner-icon">play_arrow</span>
            Resume
          </button>
        )}
        <button className="meditate__choices__button--pause" onClick = {() => setEndSession(true)}>
          <span className="material-symbols-outlined inner-icon">stop</span>
          End
        </button>
      </div>
      {endSession ? <EndMeditate endSession = {setEndSession} /> : null }
    </>
  );
};

export default MeditateActive;
