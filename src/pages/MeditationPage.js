import MeditateSetter from "../components/MeditateSetter/MeditateSetter";
import Timer from "../components/Timer/Timer";
import { useState } from "react";
import bgFire from "../assets/images/homepage/fireOnLesser.gif";

import "../styles/MeditatePage.scss";

const MeditationPage = () => {
  const [inputTime, setInputTime] = useState(15);
  //   const [pause, setPause] = useState(false);
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
