import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import "./Transcript.scss";

const Transcript = ({ text, state }) => {
  const [voiceoverObject, setVoiceoverObject] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (text.audio && !voiceoverObject) {
      const newVoiceoverObject = new Audio(`http://localhost:8080/${text.audio}`);
      setVoiceoverObject(newVoiceoverObject);
      setIsLoaded(true);
      return () => {
        newVoiceoverObject.pause();
      };
    }
  }, [text.audio, voiceoverObject]);

  useEffect(() => {
    console.log(state);
    if (voiceoverObject) {
      if (state) {
        voiceoverObject.play()
      }
      else {
        voiceoverObject.pause()
      }
    }
    
  }, [voiceoverObject, state])
  


  if (text.audio && !isLoaded) {
    return <Loader/>
  }
  

  return (
    <div className="transcript__container">
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
