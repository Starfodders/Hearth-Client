import MeditateSetter from "../components/MeditateSetter/MeditateSetter";
import Timer from "../components/Timer/Timer";
import { useState } from "react";

import "../styles/MeditatePage.scss";

const MeditationPage = () => {
  const [inputTime, setInputTime] = useState(15);
  const [pause, setPause] = useState(false);
  const [start, setStart] = useState(false);

  function handleInputTime(time) {
    setInputTime(time);
  }

  function toggleStart() {
    setStart(true);
  }

  function togglePause() {
    setPause(true);
  }

  useState(() => {
    if (pause) {
      setStart(false);
    }
  }, [pause]);

  return (
    <div className="meditate__wrapper">
      <MeditateSetter
        currentTime={inputTime}
        setTime={handleInputTime}
        start={toggleStart}
        pause={togglePause}
      />
      <Timer timer={inputTime} animate={start} pause={false} />
    </div>
  );
};

export default MeditationPage;
