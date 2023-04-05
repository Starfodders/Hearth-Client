import MeditateSetter from "../components/MeditateSetter/MeditateSetter";
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

  function handleInputTime(time) {
    setInputTime(time);
  }

  function toggleStart() {
    setStart(true);
  }

  function togglePause() {
    setStart(false);
  }

  return (
    <div className="meditate__wrapper">
      <MeditateSetter
        currentTime={inputTime}
        setTime={handleInputTime}
        start = {start}
        startState={toggleStart}
        pause={togglePause}
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
