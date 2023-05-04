import "./Timer.scss";
import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import meditateCompleteSound from "../../assets/audio/meditateDone.mp3"

const Timer = ({ timer, animate, start, setStart, setActive, opened }) => {
  const [currentTime, setCurrentTime] = useState(timer)

  const meditateSound = new Audio(meditateCompleteSound)

  const handleComplete = (e) => {
    setStart(false);
    setActive(false);
    setCurrentTime(15);
    opened(true)
    setTimeout(() => {
      meditateSound.play();
    }, 500)
  };

  useEffect(() => {
    setCurrentTime(timer)
  }, [timer])

  const children = ({ remainingTime, duration }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <>
        <p className="timer__value">
          {`${minutes}:${seconds.toString().padStart(2, "0")}`}
        </p>
      </>
    );
  };

  return (
    <div className={start ? "circle__element--on" : "circle__element"}>
      <CountdownCircleTimer
        isPlaying={animate}
        // initialRemainingTime = {15}
        duration={currentTime * 60}
        colors={["#52b69a"]}
        strokeWidth={18}
        trailStrokeWidth={18}
        strokeLinecap={"square"}
        trailColor={"#061825"}
        onComplete={(e) => {
         handleComplete(e)
        }}
      >
        {children}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
