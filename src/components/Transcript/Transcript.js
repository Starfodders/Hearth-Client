import { useState, useEffect, useRef } from "react";
import Loader from "../Loader/Loader";
import "./Transcript.scss";

const Transcript = ({ text }) => {
  const [voiceoverObject, setVoiceoverObject] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const audioRef = useRef();

  //if there is an audio object, then create it. Clean up is to pause any duplicates
  useEffect(() => {
    if (text.audio && voiceoverObject.length === 0) {
      const newVoiceoverObject = new Audio(
        `http://localhost:8080/${text.audio}`
      );
      setVoiceoverObject((prev) => [...prev, newVoiceoverObject]);
      setIsLoaded(true);
      return () => {
        newVoiceoverObject.pause();
        setVoiceoverObject([]);
      };
    }
  }, [text.audio]);


  if (text.audio && !isLoaded) {
    return <Loader />;
  }

  return (
    <div className="transcript__container">
      {text.audio ? <div className="transcript__audio">
        {voiceoverObject.length > 0 && (
          <audio
            src={`http://localhost:8080/${text.audio}`}
            ref={audioRef}
          />
        )}
        <div className="transcript__buttons">
          <div className="transcript__buttons__block">
            <span className="material-symbols-outlined button-el" onClick = {() => audioRef.current.play()}>play_arrow</span>
            <span className="material-symbols-outlined button-el" onClick = {() => audioRef.current.pause()}>pause</span>
          </div>
          <div className="transcript__buttons__block">
            <span className="material-symbols-outlined button-el" onClick = {() => audioRef.current.volume += 0.1}>add</span>
            <span className="material-symbols-outlined button-el" onClick = {() => audioRef.current.volume -= 0.1}>remove</span>
          </div>
          <div className="transcript__buttons__block">
            <span className="material-symbols-outlined button-el" onClick = {() => audioRef.current.mute()}>volume_up</span>
            <span className="material-symbols-outlined button-el">volume_mute</span>
          </div>
        </div>
        {/* <div className="transcript__progress">
          Playback Bar
        </div> */}
      </div> : null }
      {Object.values(text.content).map((textBlock, index) => {
        return (
          <p key={index} className="transcript__paragraph">
            {textBlock}
          </p>
        );
      })}
    </div>
  );
};

export default Transcript;
