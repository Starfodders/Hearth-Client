import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import "./Transcript.scss";

const Transcript = ({ text, state }) => {
  const [voiceoverObject, setVoiceoverObject] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

  // if audio object exists and audio state is true, then play it
  useEffect(() => {
    if (voiceoverObject && isLoaded) {
      console.log(voiceoverObject);
      if (state) {
        voiceoverObject[0].play();
      } else {
        voiceoverObject[0].pause();
        voiceoverObject[0].currentTime = 0;
      }
    }
  }, [voiceoverObject, isLoaded, state]);

  if (text.audio && !isLoaded) {
    return <Loader />;
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
