import MeditateSetter from "../components/MeditateSetter/MeditateSetter";
import campfire from "../assets/meditateAudio/campfire.mp3"
import waves from "../assets/meditateAudio/waves.mp3"
import rainforest from "../assets/meditateAudio/rainforest.mp3"
import minecraft from "../assets/meditateAudio/minecraft.mp3"
import Timer from "../components/Timer/Timer";
import MeditateComplete from "../components/MeditateComplete/MeditateComplete";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import bgFire from "../assets/images/homepage/fireOnLesser.gif";
import bgStatic from "../assets/images/homepage/fireOnLesser.png"

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

  //start changes active to true, active handles the meditation instance. 
  const [inputTime, setInputTime] = useState(15);
  const [start, setStart] = useState(false);
  const [active, setActive] = useState(false)
  const [meditateFinish, setMeditateFinish] = useState(false)

  const audioElRef = useRef()
  const audioSources= {
    campfire,
    waves,
    rainforest,
    minecraft
  }

  const [currentAudio, setCurrentAudio] = useState('campfire')
  const [currentAudioObj, setCurrentAudioObj] = useState([])

  function toggleStart() {
    setStart(true);
    setActive(true)
  }

  function togglePause() {
    setActive(false);
  }

  useEffect(() => {
    const newAudioObject = new Audio();
    newAudioObject.src = audioSources[currentAudio];
    newAudioObject.ref = {audioElRef}
    newAudioObject.volume = 0.5
    setCurrentAudioObj((prev) => [...prev, newAudioObject]);
  
    return () => {
      setCurrentAudioObj((prev) => prev.filter((obj) => obj !== newAudioObject));
      newAudioObject.pause();
    };
  }, [currentAudio]);

  useEffect(() => {
    if (active && currentAudioObj.length > 0) {
      currentAudioObj[0].play()
      currentAudioObj[0].loop = true
    }
    else if (currentAudioObj.length > 0){
      currentAudioObj[0].pause()
      currentAudioObj[0].loop = false

    }
  }, [start, active, currentAudioObj])

  return (
    <div className="meditate__wrapper">
      <MeditateSetter
        currentTime={inputTime}
        setTime={setInputTime}
        start = {start}
        active = {active}
        setActive = {setActive}
        startState={toggleStart}
        pause={togglePause}
        currAudio = {currentAudio}
        setAudio = {setCurrentAudio}
        currAudioObj = {currentAudioObj[0]}
      />
      <Timer timer={inputTime} animate={active} start = {start} setStart = {setStart} setActive = {setActive} opened = {setMeditateFinish} />
      {start ? (
        <div className="meditate__picture">
          <img src={active ? bgFire : bgStatic} className="meditate__gif" alt = ""/>
        </div>
      ) : null}
      {meditateFinish ? <MeditateComplete opened = {setMeditateFinish} time = {inputTime}/> : null}
    </div>
  );
};

export default MeditationPage;
