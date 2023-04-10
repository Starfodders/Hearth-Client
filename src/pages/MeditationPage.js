import MeditateSetter from "../components/MeditateSetter/MeditateSetter";
import campfire from "../assets/meditateAudio/campfire.mp3"
import waves from "../assets/meditateAudio/waves.mp3"
import rainforest from "../assets/meditateAudio/rainforest.mp3"
import Timer from "../components/Timer/Timer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import bgFire from "../assets/images/homepage/fireOnLesser.gif";

import "../styles/MeditatePage.scss";

const MeditationPage = ({isLoggedIn}) => {

  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      if (!sessionStorage.getItem('authToken')) {
        navigate('/')
      }
    } 
}, [isLoggedIn])


  const [inputTime, setInputTime] = useState(15);
  const [start, setStart] = useState(false);

  const audioSources= {
    campfire,
    waves,
    rainforest
  }

  const [currentAudio, setCurrentAudio] = useState('campfire')
  const [currentAudioObj, setCurrentAudioObj] = useState([])


  function handleInputTime(time) {
    setInputTime(time);
  }

  function toggleStart() {
    setStart(true);
  }

  function togglePause() {
    setStart(false);
  }

  useEffect(() => {
    const newAudioObject = new Audio();
    newAudioObject.src = audioSources[currentAudio];
    setCurrentAudioObj((prev) => [...prev, newAudioObject]);
  
    return () => {
      setCurrentAudioObj((prev) => prev.filter((obj) => obj !== newAudioObject));
      newAudioObject.pause();
    };
  }, [currentAudio]);

  useEffect(() => {
    if (start && currentAudioObj.length > 0) {
      currentAudioObj[0].play()
    }
    else if (currentAudioObj.length > 0){
      currentAudioObj[0].pause()
    }
  }, [start, currentAudioObj])

  return (
    <div className="meditate__wrapper">
      <MeditateSetter
        currentTime={inputTime}
        setTime={handleInputTime}
        start = {start}
        startState={toggleStart}
        pause={togglePause}
        setAudio = {setCurrentAudio}
      />
      <Timer timer={inputTime} animate={start} pause={false} />
      {start ? (
        <div className="meditate__picture">
          <img src={bgFire} className="meditate__gif" />
        </div>
      ) : null}
    </div>
  );
};

export default MeditationPage;
