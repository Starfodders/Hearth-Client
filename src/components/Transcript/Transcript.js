import { useState, useEffect, useRef } from "react";
import Loader from "../Loader/Loader";
import "./Transcript.scss";

const Transcript = ({ text, darkMode }) => {
  const [voiceoverObject, setVoiceoverObject] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentVolumeValue, setCurrentVolumeValue] = useState(0.5);
  const [isLoaded, setIsLoaded] = useState(false);

  const audioRef = useRef();

  //if there is an audio object, then create it. Clean up is to pause any duplicates
  useEffect(() => {
    if (text.audio && voiceoverObject.length === 0) {
      const newVoiceoverObject = new Audio(
        `../../assets/transcript/${text.audio}.mp3`
      );
      setVoiceoverObject((prev) => [...prev, newVoiceoverObject]);
      setIsLoaded(true);
      return () => {
        newVoiceoverObject.pause();
        setVoiceoverObject([]);
      };
    }
  }, [text.audio]);

  function handleAudioOn(audio) {
    audio.current.play();
    setAudioPlaying(true);
  }

  function handleAudioOff(audio) {
    audio.current.pause();
    setAudioPlaying(false);
  }

  function handleVolumeUp(audio) {
    const increment = 0.105;
    if (audio.current.volume + increment > 1) {
      return;
    } else {
      audio.current.volume += increment;
    }
  }
  function handleVolumeDown(audio) {
    if (audio.current.volume - 0.1 < 0) {
      return;
    } else {
      audio.current.volume -= 0.1;
    }
  }

  if (text.audio && !isLoaded) {
    return <Loader />;
  }

  return (
    <div className={darkMode ? "transcript__container--dark" : "transcript__container" }>
      {text.audio ? (
        <div className="transcript__audio">
          {voiceoverObject.length > 0 && (
            <audio
              src={require(`../../assets/transcript/${text.audio}.mp3`)}
              ref={audioRef}
            />
          )}
          <div className="transcript__buttons">
            <div className="transcript__buttons__block">
              <span
                className={
                  audioPlaying
                    ? "material-symbols-outlined button-el--off"
                    : "material-symbols-outlined button-el"
                }
                onClick={() => handleAudioOn(audioRef)}
                aria-label="Play Audio"
              >
                <span aria-hidden="true">play_arrow</span>
              </span>
              <span
                className={
                  audioPlaying
                    ? "material-symbols-outlined button-el"
                    : "material-symbols-outlined button-el--off"
                }
                onClick={() => handleAudioOff(audioRef)}
                aria-label="Pause Audio"
              >
                <span aria-hidden="true">pause</span>
              </span>
            </div>
            <div className="transcript__buttons__block">
              <span
                className={
                  audioPlaying
                    ? "material-symbols-outlined button-el"
                    : "material-symbols-outlined button-el--off"
                }
                onClick={() => handleVolumeUp(audioRef)}
                aria-label="Increase volume by 1 increment"
              >
                <span aria-hidden="true">add</span>
              </span>
              <span
                className={
                  audioPlaying
                    ? "material-symbols-outlined button-el"
                    : "material-symbols-outlined button-el--off"
                }
                onClick={() => handleVolumeDown(audioRef)}
                aria-label="Decrease volume by 1 increment"
              >
                <span aria-hidden="true">remove</span>
              </span>
            </div>
          </div>
          {/* <div className="transcript__progress">
                <progress value = "0">
                <span id="progress-bar"></span>
                </progress>
                
            </div> */}
        </div>
      ) : null}
      {/* {Object.values(text.content).map((textBlock, index) => {
        return (
          <p key={index} className="transcript__paragraph">
            {textBlock}
          </p>
        );
      })} */}
      {text.content.split(";").map((paragraph, index) => (
        <p className={darkMode ? "transcript__paragraph--dark": "transcript__paragraph"} key = {index}>{paragraph}</p>
      ))}
    </div>
  );
};

export default Transcript;
