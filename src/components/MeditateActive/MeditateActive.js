import "../MeditateSetter/MeditateSetter.scss";
import { useState, useEffect } from "react";
import EndMeditate from "../EndMeditate/EndMeditate";

const MeditateActive = ({ currAudio, currAudioObj, active, resume, pause }) => {
  const [endSession, setEndSession] = useState(false);
  const [currentVolumeValue, setCurrentVolumeValue] = useState(
    currAudio.volume
  );

  useEffect(() => {
    if (active) {
      setCurrentVolumeValue(Math.trunc(currAudioObj.volume * 10));
    }
  }, [active]);

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
          <p
            className="meditate__now-playing"
            aria-label={`Now playing ${currAudio}`}
          >
            <span aria-hidden="true">Now playing</span>
          </p>
          <p className="meditate__now-playing" aria-hidden="true">
            {currAudio}
          </p>
        </div>
        <div className="meditate__choices__volume">
          <div className="meditate__choices__volume__left">
            <label className="meditate__choices__label">{`Volume (${currentVolumeValue})`}</label>
          </div>
          <div className="meditate__choices__volume__right">
            <span
              className="material-symbols-outlined volume-el"
              onClick={() => handleVolumeUp(currAudioObj)}
            aria-label = "Increase volume by 1 increment"

            >
              <span aria-hidden="true">add</span>
            </span>
            <span
              className="material-symbols-outlined volume-el"
              onClick={() => handleVolumeDown(currAudioObj)}
            aria-label = "Decrease volume by 1 increment"

            >
              <span aria-hidden="true">remove</span>
            </span>
          </div>
        </div>
      </div>
      <div className="meditate__choices__block--active">
        {active ? (
          <button
            className="meditate__choices__button--pause"
            onClick={() => pause()}
            aria-label = "Pause Active Session"

          >
            <span className="material-symbols-outlined inner-icon">pause</span>
            <span aria-hidden="true">Pause</span>
          </button>
        ) : (
          <button
            className="meditate__choices__button--pause"
            onClick={() => resume(true)}
            aria-label = "Resume Active Session"
          >
            <span className="material-symbols-outlined inner-icon">
              <span aria-hidden="true">play_arrow</span>
            </span>
            <span aria-hidden="true">Resume</span>
          </button>
        )}
        <button
          className="meditate__choices__button--pause"
          onClick={() => setEndSession(true)}
          aria-label = "End Active Session"
        >
          <span className="material-symbols-outlined inner-icon">
            {" "}
            <span aria-hidden="true">stop</span>
          </span>
          <span aria-hidden="true">End</span>
        </button>
      </div>
      {endSession ? <EndMeditate endSession={setEndSession} /> : null}
    </>
  );
};

export default MeditateActive;
